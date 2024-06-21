// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Maintenance Record", {
	shop_no(frm) {
		shopNumber = frm.doc.shop_no;

		frappe
			.call("airplane_mode.api.get_mentenance_cost", {
				shop_no: shopNumber,
			})
			.then((res) => {
				frm.set_value("cost", res.message);
			});
	},
});
