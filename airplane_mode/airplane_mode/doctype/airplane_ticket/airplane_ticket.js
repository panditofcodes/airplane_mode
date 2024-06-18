// // Copyright (c) 2024, podes and contributors
// // For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
	refresh(frm) {
		let showBtn = true;
		if (showBtn) {
			frm.add_custom_button("Allot Seat", () => allot_seat(frm));
			showBtn = false;
		}
	},
	async before_save(frm) {
		if (!frm.doc.seat_no) {
			frappe.throw("Seat is not allotted");
			return false;
		}
		flightName = frm.doc.flight;
		let lastAllotedSeat;
		await frappe.db.get_value("Flights", `${flightName}`, "total_alloted_seat").then((res) => {
			lastAllotedSeat = res.message.total_alloted_seat;
		});

		let temp = lastAllotedSeat + 1;

		frappe.db.set_value("Flights", `${flightName}`, "total_alloted_seat", temp).then((r) => {
			let doc = r.message;
			console.log(doc);
		});
	},
	async before_submit(frm) {
		flightName = frm.doc.flight;
		let flightStatus;
		await frappe.db.get_value("Flights", `${flightName}`, "status").then((res) => {
			flightStatus = res.message.status;
		});
		if (flightStatus === "completed" || flightStatus === "cancelled") {
			frappe.throw("Form submission is not allowed as flight is cancealled or completed.");
			return false;
		}
	},
	async before_cancel(frm) {
		flightName = frm.doc.flight;
		let totalAllotedSeat;
		await frappe.db.get_value("Flights", `${flightName}`, "total_alloted_seat").then((res) => {
			totalAllotedSeat = res.message.total_alloted_seat;
		});

		updatedAllotedSeat = totalAllotedSeat - 1;

		await frappe.db
			.set_value("Flights", `${flightName}`, "total_alloted_seat", `${updatedAllotedSeat}`)
			.then((res) => {
				let doc = res.message;
				console.log(doc);
			});

		await frappe.db.delete_doc("Alloted Seat", `${flightName}`).then((exists) => {
			console.log(exists);
		});
	},
});

let isSeatAllotted = false;

async function allot_seat(frm) {
	if (isSeatAllotted) {
		frappe.show_alert("Seat is already allotted!");
		return;
	}

	isSeatAllotted = true;

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
		await frappe.db.get_value("Flights", `${flightName}`, "total_alloted_seat").then((res) => {
			lastAllotedSeat = res.message.total_alloted_seat;
		});

		// seat number generation

		let temp = lastAllotedSeat + 1;
		let seatNo = `${temp}${String.fromCharCode(
			Math.floor(Math.random() * (122 - 97 + 1)) + 97
		)}`;

		frm.set_value("seat_no", seatNo);

		await frappe.db
			.insert({
				doctype: "Alloted Seat",
				flight_name: flightName,
				passenger_name: frm.doc.passenger,
				seat_no: frm.doc.seat_no,
			})
			.then((doc) => {
				console.log(doc);
			});
	} else {
		frappe.show_alert("No more seats available!");
	}
}
