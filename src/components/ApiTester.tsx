
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ApiTester = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    console.log('handleSendRequest called');
    console.log('Current state:', { url, method, headers, body });
    
    setLoading(true);
    setResponse('');
    
    try {
      const requestOptions: RequestInit = {
        method,
      };

      // Parse headers if provided
      if (headers.trim()) {
        try {
          const parsedHeaders = JSON.parse(headers);
          requestOptions.headers = parsedHeaders;
          console.log('Parsed headers:', parsedHeaders);
        } catch (e) {
          console.error('Invalid JSON in headers:', e);
          setResponse('Error: Invalid JSON in headers');
          setLoading(false);
          return;
        }
      }

      // Add body for POST/PUT requests
      if (method !== 'GET' && method !== 'DELETE' && body.trim()) {
        requestOptions.body = body;
      }

      console.log('Making request with options:', requestOptions);
      
      const result = await fetch(url, requestOptions);
      const responseText = await result.text();
      
      const responseData = {
        status: result.status,
        statusText: result.statusText,
        headers: Object.fromEntries(result.headers.entries()),
        body: responseText
      };
      
      setResponse(JSON.stringify(responseData, null, 2));
      console.log('Request completed successfully');
      
    } catch (error) {
      console.error('Request failed:', error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Request Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-2">Method</label>
              <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
            
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-2">URL</label>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Headers (JSON format)</label>
            <Textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
              className="w-full h-24"
            />
          </div>

          {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
            <div>
              <label className="block text-sm font-medium mb-2">Request Body</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full h-32"
              />
            </div>
          )}

          <Button 
            onClick={handleSendRequest} 
            disabled={loading || !url.trim()}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {response}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApiTester;
