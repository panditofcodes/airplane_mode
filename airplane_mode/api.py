import frappe

# @frappe.whitelist(allow_guest=True)
def get_mentenance_cost(shop_no):
    mentenance_cost = frappe.db.get_value('Lease Agreement', { 'shop_no': shop_no  },[ 'mentenance_cost'  ] )
    
    return mentenance_cost

# @frappe.whitelist(allow_guest=True)
# def get_shop_inventry_list(shop_no):
#     shop_inventry_list = frappe.db.get_value('Inventory', { 'shop_no': shop_no  },[ 'inventry_list'  ] )
    
#     return shop_inventry_list