# Copyright (c) 2024, podes and contributors
# For license information, please see license.txt

# import frappe
from frappe.website.website_generator import WebsiteGenerator
import random, string


class AirplaneTicket(WebsiteGenerator):
	def before_save(self):

		# self.seat_no = f'{random.randint(1,self.capicity)}{random.choice(string.ascii_lowercase)}'

		total_add_ons_price = 0 # to store total add ons price
		for items in self.add_ons:   # this loop will calculate add ons price
			total_add_ons_price += items.amount

		self.final_amount = self.fare + total_add_ons_price  # here we are setting total fare of the fligt