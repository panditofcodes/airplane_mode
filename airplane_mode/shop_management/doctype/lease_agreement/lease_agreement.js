// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Lease Agreement", {
	async tenant(frm) {
        let image = frm.doc.profilephoto
        frm.set_value("profile_photo",image)
	},
});
