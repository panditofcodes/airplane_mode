// Copyright (c) 2024, podes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Employee", {
	date_of_birth(frm) {
		let dateOfBirth = frm.doc.date_of_birth;
		let date = new Date(dateOfBirth);

		// Check if the dateOfBirth is valid
		if (!isNaN(date.getTime())) {
			let now = new Date();
			let age = now.getFullYear() - date.getFullYear();
			let monthDiff = now.getMonth() - date.getMonth();
			let dayDiff = now.getDate() - date.getDate();

			// Adjust age if the birthdate hasn't occurred yet this year
			if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
				age--;
			}

			frm.set_value("age", age);
		} else {
			console.error("Invalid date of birth provided:", dateOfBirth);
		}
	},
});
