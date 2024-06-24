// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Tenant", {
	before_save(frm) {
		email = frm.doc.email;
		phoneNumber = frm.doc.phone_number;

		if (!email && !phoneNumber) {
			frappe.msgprint("Please fill Email or Phone Number!");
			frappe.validated = false;
		}
	},
	after_save(frm) {
		frappe.confirm(
			"Do you want to sign lease agreement ?",
			() => {
				// action to perform if Yes is selected
				frappe.set_route("Form", "Lease Agreement", "new");
			},
			() => {
				// action to perform if No is selected
			}
		);
	},
});
