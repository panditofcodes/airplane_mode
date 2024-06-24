// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Purchase Order", {
	async status(frm) {
		await frappe.db.set_value("Purchase Order", "Status", frm.doc.status);
	},

	on_submit: async function (frm) {
		frm.add_custom_button("Generate Invoice", async function generateInvoice() {
			// let newInvoice = {
			// 	shop: frm.doc.shop,
			// 	shop_no: frm.doc.shop_no,
			// 	cart_item: frm.doc.cart,
			// 	total_amount: frm.doc.total_amount,
			// };

			try {
				let doc = await frappe.db.insert({
					doctype: "Sales Invoice",
					shop: frm.doc.shop,
					shop: frm.doc.shop_no,
					cart_item: frm.doc.cart,
					total_amount: frm.doc.total_amount,
				});
				frappe.msgprint(`${doc} invoice generated.......`)
			} catch (error) {
				console.error(error);
			}

			frm.set_value("status",'Confirmed')
		});

		frm.set_value("status",'Received')
	},
});
