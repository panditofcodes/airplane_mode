# Copyright (c) 2024, podes and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Shop(Document):
	def before_load(self):
        # Custom logic to execute before the document is loaded
        	frappe.msgprint("This runs before the document is loaded!")