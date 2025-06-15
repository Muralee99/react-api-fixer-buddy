
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  mid: z.string().min(1, "Merchant ID is required."),
  fromDate: z.date({ required_error: "From date is required." }),
  toDate: z.date({ required_error: "To date is required." }),
});

export type TransactionFormValues = z.infer<typeof formSchema>;

interface TransactionFilterFormProps {
  onSearch: (data: TransactionFormValues) => void;
  isLoading: boolean;
}

const TransactionFilterForm: React.FC<TransactionFilterFormProps> = ({ onSearch, isLoading }) => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mid: "12345",
      fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      toDate: new Date(),
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearch)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="mid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merchant ID (MID)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Merchant ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>From Date</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>To Date</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransactionFilterForm;
