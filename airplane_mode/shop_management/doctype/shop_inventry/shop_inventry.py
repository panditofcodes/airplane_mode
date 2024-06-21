# Copyright (c) 2024, podes and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ShopInventry(Document):
	def before_save(self):
    		self.total_price = self.quantity * self.price
     
     
