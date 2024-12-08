from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Order, Product
from .serializers import OrderSerializer

class OrderViewSet(ModelViewSet):
    """
    ViewSet for managing Order entities with JWT authentication.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]  # Ensures authenticated access
    authentication_classes = [JWTAuthentication]  # Use JWT tokens for authentication

    def create(self, request, *args, **kwargs):
        """
        Override the create method to check stock availability before accepting an order.
        """
        product_id = request.data.get('product')
        quantity = request.data.get('quantity')

        try:
            # Get the product object
            product = Product.objects.get(id=product_id)

            # Check if the requested quantity is greater than the available stock
            if quantity > product.quantity:
                return Response(
                    {"error": "Insufficient stock. Available stock is " + str(product.quantity)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # If stock is sufficient, proceed with creating the order
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override the default DELETE method to include a success message.
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Order deleted successfully"},
            status=status.HTTP_200_OK  # Use 200 OK if returning a response body
        )
