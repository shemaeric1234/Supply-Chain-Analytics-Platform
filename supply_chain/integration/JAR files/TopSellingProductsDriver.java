package com.yourorganization.MapReduce;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class TopSellingProductsDriver {
    public static void main(String[] args) throws Exception {
        // Setup Hadoop job
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Top Selling Products");

        // Set the job's input and output classes
        job.setJarByClass(TopSellingProductsDriver.class);
        job.setMapperClass(TopSellingProductsMapper.class);
        job.setReducerClass(TopSellingProductsReducer.class);

        // Set the output key and value types
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        // Specify the input and output directories
        FileInputFormat.addInputPath(job, new Path(args[0]));  // Input path
        FileOutputFormat.setOutputPath(job, new Path(args[1]));  // Output path

        // Wait for the job to complete
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
