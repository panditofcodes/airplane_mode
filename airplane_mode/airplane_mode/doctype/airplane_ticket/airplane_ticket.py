# Copyright (c) 2024, podes and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class AirplaneTicket(Document):
	def before_save(self):
		self.set_total_amount()

	def set_total_amount(self):
		pass