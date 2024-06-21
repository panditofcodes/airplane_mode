# Copyright (c) 2024, podes and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Inventory(Document):
	def before_save(self):
		total_inventry_cost = 0
		 
		for item in self.inventry_list:
			total_inventry_cost = total_inventry_cost + (item.quantity * item.price)

		self.inventry_cost = total_inventry_cost