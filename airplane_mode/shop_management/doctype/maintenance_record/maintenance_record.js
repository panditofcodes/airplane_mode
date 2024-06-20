// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Maintenance Record", {
	refresh(frm) {},
	async shop_no(frm) {
		shopNumber = frm.doc.shop_no;
		let mentenanceCost;
		await frappe.db.get_value("Lease Agreement", shopNumber, "mentenance_cost").then((res) => {
			mentenanceCost = res.message.mentenance_cost;
		});

		frm.set_value("cost", `${mentenanceCost}`);
	},
});
