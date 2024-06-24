# Copyright (c) 2024, podes and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class PurchaseOrder(Document):
	def before_save(self):
		total_cart_value = 0
		 
		for item in self.cart:
			total_cart_value = total_cart_value + (item.quantity * item.price)

		self.total_amount = total_cart_value