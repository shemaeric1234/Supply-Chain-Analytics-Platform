from rest_framework.views import APIView
from rest_framework.response import Response
from inventory.models import Product
from orders.models import Order
from django.db.models import Sum, Count, F, Q
from django.http import JsonResponse
from orders.models import Order
from inventory.models import  Product
from users.models import  User


class DashboardView(APIView):
    def get(self, request):
        inventory_status = Product.objects.all().values('name', 'quantity')
        sales_trends = (
            Order.objects.filter(is_purchase=True)
            .values('product__name')
            .annotate(total_sold=Sum('quantity'))
        )
        return Response({
            "inventory_status": list(inventory_status),
            "sales_trends": list(sales_trends),
        })

def user_order_analysis(request):
    # Aggregate data: Get total orders per user and total quantity of products purchased
    user_data = (
        User.objects
        .annotate(total_orders=Count('order'))  # Count orders per user
        .annotate(total_purchase_quantity=Sum('order__quantity', filter=Q(order__is_purchase=True)))  # Sum of purchased products
        .annotate(total_revenue=Sum('order__quantity', filter=Q(order__is_purchase=True) & Q(order__product__price__gt=0)) * F('order__product__price'))  # Total revenue from purchases
    )

    # Aggregate most popular products (most ordered)
    most_ordered_products = (
        Product.objects
        .annotate(total_orders=Count('order'))
        .order_by('-total_orders')[:5]  # Top 5 most ordered products
    )

    # Prepare the response data for users
    user_data_list = [
        {
            'username': user.username,
            'total_orders': user.total_orders,
            'total_purchase_quantity': user.total_purchase_quantity,
            'total_revenue': user.total_revenue if user.total_revenue is not None else 0.00
        }
        for user in user_data
    ]

    # Prepare the response data for products
    most_ordered_products_list = [
        {
            'product_name': product.name,
            'total_orders': product.total_orders
        }
        for product in most_ordered_products
    ]

    # Combine both data into the final response
    response_data = {
        'user_data': user_data_list,
        'most_ordered_products': most_ordered_products_list
    }

    return JsonResponse(response_data, safe=False)
