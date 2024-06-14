// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airplane", {
	refresh(frm) {
		frm.toggle_display(
			["initial_audit_completed"],
			frappe.session.user == "Airport Authority Personnel"
		);
	},
});
