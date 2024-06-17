// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airlines", {
	refresh(frm) {
        const stream_link = frm.doc.website;
        frm.add_web_link(stream_link, "View Website");
	},
});
