from django.core.management.base import BaseCommand
from integration.utils import run_mapreduce, fetch_mapreduce_results

class Command(BaseCommand):
    help = 'Runs a MapReduce job on Hadoop and fetches the results'

    def handle(self, *args, **options):
        # Running the MapReduce job (ensure you have a method to do that)
        run_mapreduce()

        # Fetching the results of the MapReduce job
        results = fetch_mapreduce_results()

        # Displaying the results in the console (or save to DB if needed)
        self.stdout.write(self.style.SUCCESS(f'Results: {results}'))
