// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Purchase Order", {
	async status(frm) {
		await frappe.db.set_value("Purchase Order", "Status", frm.doc.status);
	},

	async before_submit(frm) {
		newInvoice = frm.doc;

		await frappe.db
			.insert({
				doctype: "Sales Invoice",
				subject: newInvoice,
			})
			.then((doc) => {
				console.log(doc);
			});
	},
});
