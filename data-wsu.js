allVulnerabilities.push(
{
    "id": 48,
    "title": "Web Shell Upload Vulnerability",
    "summary": `
        <p><b>Web Shell Upload Vulnerability</b> is a critical security issue that occurs when attackers upload malicious server-side scripts to vulnerable web applications.</p>

        <p>This vulnerability may allow attackers to execute system commands, manage files, steal sensitive data, establish persistence, or fully compromise the affected server.</p>

        <h3>What is a Web Shell?</h3>

        <p>A web shell is a malicious script uploaded to a web server that provides attackers with remote control through HTTP requests.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications improperly validate uploaded files and allow executable scripts to be stored inside accessible web directories.</p>

        <h3>Basic Vulnerable Upload Scenario:</h3>

        <pre><code>Upload executable file into web-accessible directory</code></pre>

        <p>If the server executes uploaded files, attackers may gain Remote Code Execution.</p>

        <h3>Basic PHP Web Shell Example:</h3>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <p>The uploaded shell allows attackers to run operating system commands remotely.</p>

        <h3>Why are Web Shells Dangerous?</h3>

        <p>Successful exploitation may provide persistent remote access to the compromised server.</p>

        <h3>Command Execution Example:</h3>

        <pre><code>http://target.com/shell.php?cmd=whoami</code></pre>

        <p>The attacker executes commands directly through HTTP parameters.</p>

        <h3>Common Web Shell Extensions:</h3>

        <pre><code>.php
.asp
.aspx
.jsp
.cgi</code></pre>

        <p>Attackers upload executable scripts supported by the target server environment.</p>

        <h3>File Upload Bypass Example:</h3>

        <pre><code>shell.php.jpg</code></pre>

        <p>Weak extension filtering may allow disguised malicious files.</p>

        <h3>MIME Type Spoofing:</h3>

        <pre><code>Content-Type: image/png</code></pre>

        <p>Attackers spoof upload content types to bypass validation mechanisms.</p>

        <h3>Double Extension Example:</h3>

        <pre><code>shell.php.png</code></pre>

        <p>Improper extension validation may execute disguised scripts.</p>

        <h3>Popular Web Shell Families:</h3>

        <pre><code>c99
r57
China Chopper
WSO Shell</code></pre>

        <p>Advanced web shells provide complete server management capabilities.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote command execution.</p>
        <p>2. File management.</p>
        <p>3. Privilege escalation.</p>
        <p>4. Persistence establishment.</p>
        <p>5. Data exfiltration.</p>

        <h3>Directory Enumeration Example:</h3>

        <pre><code>ls -la
dir</code></pre>

        <p>Attackers enumerate server files after gaining shell access.</p>

        <h3>Credential Theft Example:</h3>

        <pre><code>cat config.php</code></pre>

        <p>Configuration files may expose database credentials and secrets.</p>

        <h3>Remote Access Persistence:</h3>

        <p>Attackers often leave hidden web shells to maintain long-term access.</p>

        <h3>Indicators of Web Shell Upload Attacks:</h3>

        <p>1. Suspicious executable uploads.</p>
        <p>2. Unknown server-side scripts.</p>
        <p>3. Unexpected command execution.</p>
        <p>4. Abnormal outbound traffic.</p>
        <p>5. Strange web requests.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Profile image uploads

CMS file managers

Document upload systems

Support ticket attachments

File sharing portals</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /upload HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker uploads malicious server-side payloads through vulnerable upload endpoints.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Move uploaded file directly into web root</code></pre>

        <p>The application stores user-controlled files inside executable directories.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate file types

Rename uploaded files

Disable script execution</code></pre>

        <p>The application securely handles uploaded content and prevents execution.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Strictly validate file extensions.</b></p>

        <p><b>2. Verify MIME types securely.</b></p>

        <p><b>3. Store uploads outside web-accessible directories.</b></p>

        <p><b>4. Disable script execution inside upload folders.</b></p>

        <p><b>5. Rename uploaded files using random names.</b></p>

        <p><b>6. Use antivirus and malware scanning solutions.</b></p>

        <p><b>7. Monitor suspicious upload activity continuously.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Disable dangerous scripting functions

Restrict file execution permissions

Use WAF protections

Enable upload monitoring

Apply least privilege permissions</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
YARA
ClamAV</code></pre>

        <h3>Difference Between Web Shell and Reverse Shell:</h3>

        <p><b>Web Shell:</b> Commands execute through web requests over HTTP.</p>

        <p><b>Reverse Shell:</b> The server connects back to the attacker's machine interactively.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may fully compromise web servers, steal sensitive information, execute arbitrary commands, deploy malware, establish persistence, or pivot deeper into internal infrastructure.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Web Shell Upload vulnerabilities are considered extremely critical because unrestricted executable uploads may directly lead to complete server compromise and persistent remote access.</p>
    `
},


{
    "id": 49,
    "title": "Linux Privilege Escalation",
    "summary": `
        <p><b>Linux Privilege Escalation</b> is a post-exploitation attack technique where attackers gain higher permissions on a Linux system after obtaining initial low-level access.</p>

        <p>This attack may allow attackers to become root users, bypass system restrictions, access sensitive files, control services, or fully compromise the operating system.</p>

        <h3>What is Privilege Escalation?</h3>

        <p>Privilege escalation occurs when attackers abuse misconfigurations, vulnerable software, or weak permissions to gain elevated access.</p>

        <h3>Why is Linux Privilege Escalation Dangerous?</h3>

        <p>Successful exploitation may provide complete administrative control over the target system.</p>

        <h3>Common Initial Access Sources:</h3>

        <pre><code>Web shell
SSH compromise
Weak passwords
Remote Code Execution
File upload vulnerabilities</code></pre>

        <p>Attackers first obtain limited user access before escalating privileges.</p>

        <h3>Checking Current User:</h3>

        <pre><code>whoami
id</code></pre>

        <p>Attackers identify current permissions and group memberships.</p>

        <h3>Sudo Misconfiguration:</h3>

        <pre><code>sudo -l</code></pre>

        <p>Misconfigured sudo permissions may allow execution of privileged commands.</p>

        <h3>Dangerous Sudo Example:</h3>

        <pre><code>(ALL) NOPASSWD: ALL</code></pre>

        <p>Improper sudo rules may grant unrestricted root access.</p>

        <h3>SUID Binary Exploitation:</h3>

        <pre><code>find / -perm -4000 2&gt;/dev/null</code></pre>

        <p>SUID binaries execute with elevated privileges and may contain exploitable weaknesses.</p>

        <h3>Writable File Exploitation:</h3>

        <pre><code>find / -writable 2&gt;/dev/null</code></pre>

        <p>World-writable files may allow attackers to modify critical configurations.</p>

        <h3>PATH Hijacking:</h3>

        <pre><code>export PATH=.</code></pre>

        <p>Improper PATH handling may execute attacker-controlled binaries.</p>

        <h3>Cron Job Exploitation:</h3>

        <pre><code>cat /etc/crontab</code></pre>

        <p>Writable cron scripts may execute malicious commands as root.</p>

        <h3>Kernel Exploitation:</h3>

        <pre><code>uname -a</code></pre>

        <p>Outdated kernels may contain Local Privilege Escalation vulnerabilities.</p>

        <h3>Password File Enumeration:</h3>

        <pre><code>cat /etc/passwd</code></pre>

        <p>Attackers inspect local user accounts and configurations.</p>

        <h3>Shadow File Access:</h3>

        <pre><code>cat /etc/shadow</code></pre>

        <p>Improper permissions may expose password hashes.</p>

        <h3>Capabilities Abuse:</h3>

        <pre><code>getcap -r / 2&gt;/dev/null</code></pre>

        <p>Linux capabilities may unintentionally grant elevated privileges.</p>

        <h3>Docker Group Abuse:</h3>

        <pre><code>groups</code></pre>

        <p>Membership in the docker group may provide root-equivalent access.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Root access.</p>
        <p>2. Sensitive file access.</p>
        <p>3. Persistence installation.</p>
        <p>4. Credential theft.</p>
        <p>5. Full server compromise.</p>

        <h3>SSH Key Theft Example:</h3>

        <pre><code>cat ~/.ssh/id_rsa</code></pre>

        <p>Attackers may steal SSH keys for persistent remote access.</p>

        <h3>Environment Variable Abuse:</h3>

        <pre><code>LD_PRELOAD</code></pre>

        <p>Improper environment handling may allow code injection.</p>

        <h3>Indicators of Privilege Escalation Attempts:</h3>

        <p>1. Suspicious sudo usage.</p>
        <p>2. Unauthorized file modifications.</p>
        <p>3. Unexpected cron jobs.</p>
        <p>4. Strange process execution.</p>
        <p>5. Unusual privilege changes.</p>

        <h3>Common Vulnerable Configurations:</h3>

        <pre><code>Weak sudo policies

Misconfigured SUID binaries

Writable system files

Outdated kernels

Insecure cron jobs</code></pre>

        <h3>Example Enumeration Commands:</h3>

        <pre><code>linpeas.sh
sudo -l
find / -perm -4000</code></pre>

        <p>Attackers perform system enumeration to identify escalation vectors.</p>

        <h3>Unsafe System Configuration:</h3>

        <pre><code>// Vulnerable Example

User can run all commands with sudo</code></pre>

        <p>Improper privilege separation exposes the entire system.</p>

        <h3>Secure Configuration Example:</h3>

        <pre><code>// Secure Example

Apply least privilege

Restrict sudo access

Audit SUID binaries</code></pre>

        <p>The system limits unnecessary administrative permissions.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Apply least privilege principles.</b></p>

        <p><b>2. Restrict sudo permissions carefully.</b></p>

        <p><b>3. Audit SUID and SGID binaries regularly.</b></p>

        <p><b>4. Patch kernels and software continuously.</b></p>

        <p><b>5. Secure cron jobs and scheduled tasks.</b></p>

        <p><b>6. Monitor privilege changes actively.</b></p>

        <p><b>7. Restrict writable system files.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable audit logging

Apply kernel hardening

Restrict dangerous capabilities

Use AppArmor or SELinux

Monitor authentication events</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>LinPEAS
Linux Exploit Suggester
pspy
Lynis
Chkrootkit</code></pre>

        <h3>Difference Between Privilege Escalation and Remote Code Execution:</h3>

        <p><b>Privilege Escalation:</b> Increases permissions after gaining initial access.</p>

        <p><b>Remote Code Execution:</b> Allows attackers to execute code remotely initially.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain root privileges, steal credentials, disable security controls, deploy persistence mechanisms, manipulate services, or fully compromise Linux servers.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Linux Privilege Escalation vulnerabilities are considered extremely critical because successful exploitation may provide complete administrative control over operating systems.</p>
    `
},


{
    "id": 50,
    "title": "Linux Sudo Misconfiguration",
    "summary": `
        <p><b>Linux Sudo Misconfiguration</b> is a dangerous privilege escalation vulnerability that occurs when sudo permissions are improperly configured, allowing users to execute commands with elevated privileges.</p>

        <p>This vulnerability may allow attackers to gain root access, bypass restrictions, execute arbitrary commands, or fully compromise Linux systems.</p>

        <h3>What is Sudo?</h3>

        <p><code>sudo</code> is a Linux utility that allows authorized users to execute commands as another user, usually the root user.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when administrators grant excessive or insecure sudo permissions without proper restrictions.</p>

        <h3>Checking Sudo Permissions:</h3>

        <pre><code>sudo -l</code></pre>

        <p>This command displays commands the current user is allowed to run with elevated privileges.</p>

        <h3>Dangerous Sudo Rule Example:</h3>

        <pre><code>(ALL) NOPASSWD: ALL</code></pre>

        <p>This configuration allows unrestricted root command execution without requiring a password.</p>

        <h3>Why is Sudo Misconfiguration Dangerous?</h3>

        <p>Successful exploitation may provide attackers with complete root-level access to the system.</p>

        <h3>Shell Escape via Vim:</h3>

        <pre><code>sudo vim

:set shell=/bin/bash
:shell</code></pre>

        <p>Attackers may escape into a root shell using interactive applications.</p>

        <h3>Shell Escape via Less:</h3>

        <pre><code>sudo less /etc/profile

!/bin/bash</code></pre>

        <p>Certain programs allow command execution directly from interactive mode.</p>

        <h3>Shell Escape via Python:</h3>

        <pre><code>sudo python3 -c 'import os; os.system("/bin/bash")'</code></pre>

        <p>Python execution permissions may directly lead to root shell access.</p>

        <h3>Shell Escape via Find:</h3>

        <pre><code>sudo find . -exec /bin/bash \\; -quit</code></pre>

        <p>Attackers abuse executable functions inside allowed binaries.</p>

        <h3>GTFOBins Abuse:</h3>

        <pre><code>https://gtfobins.github.io/</code></pre>

        <p>GTFOBins documents Linux binaries that can be abused for privilege escalation.</p>

        <h3>Wildcard Abuse Example:</h3>

        <pre><code>sudo tar *</code></pre>

        <p>Improper wildcard handling may allow command injection during execution.</p>

        <h3>Environment Variable Abuse:</h3>

        <pre><code>LD_PRELOAD</code></pre>

        <p>Improper environment restrictions may allow malicious library injection.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Root shell access.</p>
        <p>2. Command execution.</p>
        <p>3. Credential theft.</p>
        <p>4. Persistence installation.</p>
        <p>5. Full server compromise.</p>

        <h3>Sudoers File Location:</h3>

        <pre><code>/etc/sudoers</code></pre>

        <p>Improper entries inside the sudoers configuration may expose the system.</p>

        <h3>Unsafe Sudo Configuration Example:</h3>

        <pre><code>user ALL=(ALL) NOPASSWD:/usr/bin/vim</code></pre>

        <p>Interactive applications often provide shell escape functionality.</p>

        <h3>Privilege Escalation via Nmap:</h3>

        <pre><code>sudo nmap --interactive</code></pre>

        <p>Older versions of Nmap may provide interactive shell execution.</p>

        <h3>Indicators of Sudo Misconfiguration:</h3>

        <p>1. Excessive sudo permissions.</p>
        <p>2. NOPASSWD rules.</p>
        <p>3. Interactive binaries allowed via sudo.</p>
        <p>4. Weak command restrictions.</p>
        <p>5. Unsafe environment variable handling.</p>

        <h3>Common Vulnerable Programs:</h3>

        <pre><code>vim
less
find
python
perl
tar</code></pre>

        <p>Many legitimate binaries contain functionality useful for shell escapes.</p>

        <h3>Example Enumeration Commands:</h3>

        <pre><code>sudo -l
cat /etc/sudoers
groups</code></pre>

        <p>Attackers enumerate sudo privileges and user permissions.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Allow unrestricted sudo execution</code></pre>

        <p>The system grants excessive administrative permissions to low-privileged users.</p>

        <h3>Secure Configuration Example:</h3>

        <pre><code>// Secure Example

Restrict sudo commands

Avoid interactive binaries

Require passwords</code></pre>

        <p>The system applies strict privilege separation and command restrictions.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Apply least privilege principles.</b></p>

        <p><b>2. Restrict sudo access carefully.</b></p>

        <p><b>3. Avoid allowing interactive programs through sudo.</b></p>

        <p><b>4. Remove unnecessary NOPASSWD rules.</b></p>

        <p><b>5. Restrict dangerous environment variables.</b></p>

        <p><b>6. Audit sudo configurations regularly.</b></p>

        <p><b>7. Monitor suspicious privilege escalation activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable audit logging

Restrict administrative groups

Use AppArmor or SELinux

Apply command whitelisting

Monitor sudo events</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>LinPEAS
GTFOBins
Lynis
pspy
Linux Exploit Suggester</code></pre>

        <h3>Difference Between Sudo Misconfiguration and Kernel Exploits:</h3>

        <p><b>Sudo Misconfiguration:</b> Exploits insecure privilege settings.</p>

        <p><b>Kernel Exploits:</b> Exploit vulnerabilities inside the Linux kernel itself.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain root privileges, bypass security controls, manipulate services, install persistence mechanisms, steal sensitive data, or fully compromise Linux servers.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Linux Sudo Misconfiguration vulnerabilities are considered extremely critical because improper privilege delegation may directly expose full administrative control.</p>
    `
},


);
