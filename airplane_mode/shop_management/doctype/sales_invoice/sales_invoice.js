// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sales Invoice", {
	refresh(frm) {
       let date = new Date()

       let dd = date.getDate()
       let mm = date.getMonth()
       let yyyy = date.getFullYear()

       frm.set_value('date',`${dd}-${mm}-${yyyy}`)
    }
    
});
