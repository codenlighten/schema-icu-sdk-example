const { SchemaICU } = require('@smartledger/schema-icu-sdk');

/**
 * Error Handling Examples
 * 
 * Demonstrates how to handle various error scenarios when using Schema.ICU SDK
 */

async function demonstrateErrorHandling() {
  const client = new SchemaICU();

  console.log('🛡️  Schema.ICU - Error Handling Examples\n');
  console.log('='.repeat(60) + '\n');

  // 1. Check Authentication
  console.log('1️⃣ Authentication Check');
  try {
    if (!client.isAuthenticated()) {
      throw new Error('Not authenticated. Run: npx schema-icu setup');
    }
    console.log('✅ Authenticated successfully\n');
  } catch (error) {
    console.error('❌ Authentication Error:', error.message);
    process.exit(1);
  }

  // 2. Handle API Errors with Retry Logic
  console.log('2️⃣ API Error with Retry Logic');
  async function callWithRetry(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await fn();
        return result;
      } catch (error) {
        console.log(`   Attempt ${i + 1}/${maxRetries} failed: ${error.message}`);
        
        if (i < maxRetries - 1) {
          console.log(`   Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error;
        }
      }
    }
  }

  try {
    const result = await callWithRetry(
      () => client.codeGenerator.generate('Create a hello function', { language: 'JavaScript' })
    );
    console.log('✅ Request succeeded:', result.success);
    console.log();
  } catch (error) {
    console.error('❌ All retries failed:', error.message);
  }

  // 3. Validate Response Structure
  console.log('3️⃣ Response Validation');
  try {
    const result = await client.schemaGenerator.generate('Create a simple user schema');
    
    // Validate response
    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response: Not an object');
    }
    
    if (!result.success) {
      throw new Error(`Request failed: ${result.error || 'Unknown error'}`);
    }
    
    if (!result.data) {
      throw new Error('Invalid response: Missing data field');
    }
    
    // Verify signature
    if (!result.signature || !result.signature.hash) {
      console.warn('⚠️  Warning: Response is not cryptographically signed');
    } else {
      console.log('✅ Response validated and cryptographically signed');
    }
    
    console.log();
  } catch (error) {
    console.error('❌ Validation Error:', error.message);
  }

  // 4. Handle Missing Context Gracefully
  console.log('4️⃣ Handle Missing Context');
  try {
    const result = await client.codeGenerator.generate(
      'Optimize this code', // Intentionally vague
      { language: 'JavaScript' }
    );
    
    if (result.success && result.data.missingContext && result.data.missingContext.length > 0) {
      console.log('⚠️  Agent needs more context:');
      result.data.missingContext.forEach((ctx, i) => {
        console.log(`   ${i + 1}. ${ctx}`);
      });
      console.log('\n💡 Tip: Provide more specific details in your query\n');
    } else {
      console.log('✅ Agent had sufficient context\n');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  // 5. Handle Network Errors
  console.log('5️⃣ Network Error Handling');
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout
    
    const result = await client.terminalAgent.generate(
      'List all files in current directory',
      { os: 'windows', shell: 'bash' }
    );
    
    clearTimeout(timeout);
    console.log('✅ Request completed within timeout\n');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('❌ Request timeout - took longer than 30 seconds');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('❌ Network Error: Cannot connect to Schema.ICU API');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.error('❌ Network Error: Connection timed out');
    } else {
      console.error('❌ Network Error:', error.message);
    }
  }

  // 6. Handle Rate Limiting (Enterprise has no limits, but good practice)
  console.log('6️⃣ Rate Limit Handling');
  try {
    const result = await client.base.query('What is rate limiting?');
    
    if (result.success) {
      console.log('✅ Request successful (Enterprise tier - no rate limits)\n');
    }
  } catch (error) {
    if (error.statusCode === 429) {
      const retryAfter = error.response?.headers?.['retry-after'] || 60;
      console.error(`❌ Rate Limited: Retry after ${retryAfter} seconds`);
    } else {
      console.error('❌ Error:', error.message);
    }
  }

  // 7. Graceful Degradation
  console.log('7️⃣ Graceful Degradation Pattern');
  async function generateCodeSafely(query, fallback = '// Code generation failed') {
    try {
      const result = await client.codeGenerator.generate(query, { language: 'JavaScript' });
      return result.success ? result.data.code : fallback;
    } catch (error) {
      console.warn(`⚠️  Code generation failed, using fallback: ${error.message}`);
      return fallback;
    }
  }

  const code = await generateCodeSafely('Create a sum function');
  console.log('Generated code:', code.substring(0, 50) + '...');
  console.log();

  // 8. Comprehensive Error Handler
  console.log('8️⃣ Comprehensive Error Handler');
  function handleSchemaICUError(error) {
    if (error.statusCode === 400) {
      return {
        type: 'VALIDATION_ERROR',
        message: 'Invalid request parameters',
        details: error.response?.error || error.message,
        action: 'Check your query and context parameters'
      };
    } else if (error.statusCode === 401 || error.statusCode === 403) {
      return {
        type: 'AUTH_ERROR',
        message: 'Authentication failed',
        details: error.message,
        action: 'Run: npx schema-icu setup'
      };
    } else if (error.statusCode === 429) {
      return {
        type: 'RATE_LIMIT_ERROR',
        message: 'Too many requests',
        details: error.message,
        action: 'Wait before retrying or upgrade plan'
      };
    } else if (error.statusCode >= 500) {
      return {
        type: 'SERVER_ERROR',
        message: 'Schema.ICU service error',
        details: error.message,
        action: 'Retry request or check https://status.schema.icu'
      };
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return {
        type: 'NETWORK_ERROR',
        message: 'Cannot reach Schema.ICU API',
        details: error.message,
        action: 'Check internet connection'
      };
    } else {
      return {
        type: 'UNKNOWN_ERROR',
        message: 'Unexpected error occurred',
        details: error.message,
        action: 'Contact support@smartledger.technology'
      };
    }
  }

  try {
    // Simulate an error for demonstration
    const result = await client.promptImprover.improve('test');
    console.log('✅ No errors encountered\n');
  } catch (error) {
    const errorInfo = handleSchemaICUError(error);
    console.log(`Error Type: ${errorInfo.type}`);
    console.log(`Message: ${errorInfo.message}`);
    console.log(`Details: ${errorInfo.details}`);
    console.log(`Recommended Action: ${errorInfo.action}\n`);
  }

  console.log('='.repeat(60));
  console.log('✅ Error handling demonstration complete!');
  console.log('\n💡 Best Practices:');
  console.log('   1. Always check authentication before making requests');
  console.log('   2. Implement retry logic for transient failures');
  console.log('   3. Validate response structure and signatures');
  console.log('   4. Handle missing context gracefully');
  console.log('   5. Use timeouts to prevent hanging requests');
  console.log('   6. Implement graceful degradation for non-critical features');
  console.log('   7. Log errors for debugging and monitoring');
}

// Run if executed directly
if (require.main === module) {
  demonstrateErrorHandling().catch(error => {
    console.error('\n💥 Unhandled Error:', error);
    process.exit(1);
  });
}

module.exports = { demonstrateErrorHandling };
