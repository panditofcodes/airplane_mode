// // Copyright (c) 2024, podes and contributors
// // For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
	refresh(frm) {
		let showBtn = true
		if(showBtn){
			frm.add_custom_button("Allot Seat", () => allot_seat(frm));
			showBtn = false
		}
	},
});

async function allot_seat(frm) {
	flightName = frm.doc.flight;
	let flightCapacity;
	await frappe.db.get_value("Flights", `${flightName}`, "capicity").then((res) => {
		flightCapacity = res.message.capicity;
	});
	let totalEntries;

	await frappe.db
		.count("Alloted Seat", { filters: { flight_name: flightName } })
		.then((count) => {
			totalEntries = count;
		})
		.catch((err) => {
			// Handle error
			console.error("Error:", err);
		});

	if (totalEntries < flightCapacity) {
		let lastAllotedSeat;
		await frappe.db.get_value("Flights", `${flightName}`, "last_alloted_seat").then((res) => {
			lastAllotedSeat = res.message.last_alloted_seat;
		});
		let temp = lastAllotedSeat + 1;
		let seatNo = `${temp}${String.fromCharCode(
			Math.floor(Math.random() * (122 - 97 + 1)) + 97
		)}`;

		frm.set_value("seat_no", seatNo);

		frappe.db.set_value("Flights", `${flightName}`, "last_alloted_seat", temp).then((r) => {
			let doc = r.message;
			console.log(doc);
		});
	} else {
		frappe.show_alert("No more seats available!")
	}
}
