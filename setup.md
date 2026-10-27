Mahmoud & Nada: wishes setup (free, no Supabase)
The wishes are saved in a Google Sheet that you own. A guest writes a wish on the invitation, it appears as a new row in the sheet, and the invitation reads the rows back to show them on the page.

Step 1: Create the Google Sheet
Go to https://sheets.new (signed in to your Google account).

Rename the file (top left) to Mahmoud & Nada Wishes.

At the bottom, double-click the tab Sheet1 and rename it to Wishes. The name must be exactly Wishes.

Type these headers in row 1:

A	B	C	D
1	Time	Name	Message	Show
Leave everything below row 1 empty. Each wish will fill one new row:

Column	What goes in it
A: Time	When the wish was sent (filled in automatically)
B: Name	The guest's name
C: Message	The wish
D: Show	yes = shown on the invitation, no = hidden
(If you skip this step, the script creates the tab and headers by itself.)

Step 2: Add the script to the sheet
In the sheet's menu, click Extensions → Apps Script. A new tab opens.
Delete the code that's already there (function myFunction() {}).
Open wishes-script.gs from this folder, copy all of it, and paste it in.
Click the Save icon (💾).
Step 3: Publish the script as a web link
Click the blue Deploy button (top right) → New deployment.
Click the gear ⚙ next to "Select type" → choose Web app.
Fill in:
Description: wishes
Execute as: Me
Who has access: Anyone ← important, or guests can't send wishes
Click Deploy.
Click Authorize access and choose your Google account. Google will warn "Google hasn't verified this app". That's normal because you wrote the script yourself. Click Advanced → Go to … (unsafe) → Allow.
Copy the Web app URL. It looks like https://script.google.com/macros/s/AKfy...long code.../exec
Check it works: paste that URL into a new browser tab. You should see: {"ok":true,"wishes":[]}

Step 4: Link it with the invitation
Open index.html and find this line near the top of the <script> part (near the bottom of the file):

const WISHES_URL = '';
Paste your URL between the quotes:

const WISHES_URL = 'https://script.google.com/macros/s/AKfy.../exec';
Save the file. Wishes now go to your sheet and every guest sees them. Send a test wish, check that it appears as row 2 in the sheet, then delete that row.

Managing wishes
Hide a wish: change its Show cell to no. It disappears from the page on the next refresh.
Changed the script later? Go to Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy. This keeps the same URL. A New deployment gives you a new URL, which you'd have to paste into index.html again.
Put the invitation online (free)
Go to https://app.netlify.com/drop and drag the engagement-invite folder onto the page. You get a link to send to guests. Make a free account so the link doesn't expire.