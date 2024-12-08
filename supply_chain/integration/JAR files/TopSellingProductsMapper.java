package com.yourorganization.MapReduce;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

public class TopSellingProductsMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
    private Text productId = new Text();
    private IntWritable quantity = new IntWritable();

    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        String[] fields = value.toString().split(",");
        if (fields.length > 2) {
            productId.set(fields[1]);  // Assuming product_id is the 2nd field
            quantity.set(Integer.parseInt(fields[3]));  // Assuming quantity is the 4th field
            context.write(productId, quantity);
        }
    }
}
