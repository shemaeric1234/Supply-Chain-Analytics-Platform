from rest_framework.views import APIView
from rest_framework.response import Response
from inventory.models import Product
from orders.models import Order
from django.db.models import Sum

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
