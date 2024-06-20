// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Inventory", {
	shop_inventory_add: function (frm, cdt, cdn) {
		frappe.show_alert("New row added to Shop Inventory!");
	},
});
