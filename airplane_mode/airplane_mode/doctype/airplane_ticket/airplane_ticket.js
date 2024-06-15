// // Copyright (c) 2024, podes and contributors
// // For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
	refresh(frm) {
		frm.add_custom_button("Allot Seat", () => allot_seat(frm));
		frappe.show_alert("Working", 2);
	},
});

function allot_seat(frm) {
	f_name = frm.doc.flight;
	let total_entries; // Declare total_entries only once

	frappe.db
		.count("Alloted Seat", { flight_name: f_name })
		.then((count) => {
			total_entries = count;
			frappe.show_alert(`Total Entries: ${total_entries}`);
		})
		.catch((err) => {
			// Handle error
			console.error("Error:", err);
		});
}
