
(function(){
  function qs(s){return document.querySelector(s)}
  function qsa(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
  function storageGet(key,fallback){
    try{return localStorage.getItem(key)||fallback}catch(e){return fallback}
  }
  function storageSet(key,value){
    try{localStorage.setItem(key,value)}catch(e){}
  }
  var SW_TEXT={
    "EDON ED-1508K-1.8 Pressure Washer | OHGS Arusha":"Mashine ya Presha EDON ED-1508K-1.8 | OHGS Arusha",
    "Commercial Cleaning Trolleys | OHGS Arusha":"Matoroli ya Usafi wa Biashara | OHGS Arusha",
    "Garden Sprayers | OHGS Arusha":"Sprayer za Bustani | OHGS Arusha",
    "INGCO 6.5HP Plate Compactor (127 kg) | OHGS Arusha":"INGCO Plate Compactor 6.5HP (kilo 127) | OHGS Arusha",
    "Concrete Mixer | OHGS Arusha":"Mashine ya Kuchanganya Zege | OHGS Arusha",
    "EDON AD-21V Cordless Drill Kit | OHGS Arusha":"Seti ya Drili ya Betri EDON AD-21V | OHGS Arusha",
    "EDON PROMAX 1100W Submersible Pump | OHGS Arusha":"Pampu ya Kuzamishwa EDON PROMAX 1100W | OHGS Arusha",
    "Vackson VK10500IS Silent Inverter Generator | OHGS Arusha":"Jenereta Kimya ya Inverter Vackson VK10500IS | OHGS Arusha",
    "INGCO 166-Piece P20S Tool Kit | OHGS Arusha":"Seti ya Zana INGCO P20S Vipande 166 | OHGS Arusha",
    "INGCO 1100W 16mm Drill | OHGS Arusha":"Drili ya INGCO 1100W 16mm | OHGS Arusha",
    "Coral Wood Glue | OHGS Arusha":"Gundi ya Mbao Coral | OHGS Arusha",
    "Search pumps, drills, tools…":"Tafuta pampu, drili, zana…",
    "OHGS Build with us construction campaign":"Kampeni ya ujenzi ya OHGS Jenga nasi",
    "Play OHGS Build with us construction campaign":"Cheza kampeni ya ujenzi ya OHGS Jenga nasi",
    "Play video":"Cheza video",
    "Skip to content":"Nenda kwenye maudhui",
    "Product highlights. Simple ordering.":"Bidhaa bora. Kuagiza kwa urahisi.",
    "Supporting Tanzania’s farmers.":"Tunawaunga mkono wakulima wa Tanzania.",
    "Find all ten videos in Gallery.":"Video zote kumi zipo Matunzio.",
    'Home':'Mwanzo',
    'About':'Kuhusu',
    'About OHGS':'Kuhusu OHGS',
    'Products':'Bidhaa',
    'Services':'Huduma',
    'Projects':'Miradi',
    'Promotions':'Ofa',
    'Gallery':'Matunzio',
    'Contact':'Mawasiliano',
    'Offers':'Ofa',
    'EN / SW':'Kiswahili',
    'Home | OHGS Hardware':'Mwanzo | OHGS Hardware',
    'About | OHGS Hardware':'Kuhusu | OHGS Hardware',
    'Products | OHGS Hardware':'Bidhaa | OHGS Hardware',
    'Services | OHGS Hardware':'Huduma | OHGS Hardware',
    'Projects | OHGS Hardware':'Miradi | OHGS Hardware',
    'Promotions | OHGS Hardware':'Ofa | OHGS Hardware',
    'Gallery | OHGS Hardware':'Matunzio | OHGS Hardware',
    'Contact | OHGS Hardware':'Mawasiliano | OHGS Hardware',
    'OHGS Hardware Arusha | Tools, Pumps & Equipment':'OHGS Hardware Arusha | Zana, Pampu na Vifaa',
    'Hardware Products in Arusha | OHGS':'Bidhaa za Hardware Arusha | OHGS',
    'Hardware Supply Services in Arusha | OHGS':'Huduma za Ugavi wa Hardware Arusha | OHGS',
    'Project Tools & Site Equipment in Arusha | OHGS':'Zana za Miradi na Vifaa vya Site Arusha | OHGS',
    'OHGS Hardware Showroom Gallery | Arusha':'Matunzio ya Showroom ya OHGS Hardware | Arusha',
    'Hardware Promotions & New Stock | OHGS Arusha':'Ofa za Hardware na Stok Mpya | OHGS Arusha',
    'About OHGS Hardware & General Supply | Arusha':'Kuhusu OHGS Hardware & General Supply | Arusha',
    'Contact OHGS Hardware in Arusha':'Wasiliana na OHGS Hardware Arusha',
    'Pressure Washers & Cleaning Equipment | OHGS Arusha':'Pressure Washers na Vifaa vya Usafi | OHGS Arusha',
    'Construction Equipment & Materials | OHGS Arusha':'Vifaa na Malighafi za Ujenzi | OHGS Arusha',
    'Outdoor Power Tools & Grass Trimmers | OHGS Arusha':'Zana za Nje na Mashine za Kukata Nyasi | OHGS Arusha',
    'Water Pumps & Water Systems | OHGS Arusha':'Pampu na Mifumo ya Maji | OHGS Arusha',
    'Workshop Equipment & Air Compressors | OHGS Arusha':'Vifaa vya Karakana na Air Compressors | OHGS Arusha',
    'Chainsaws in Arusha | OHGS Hardware':'Chainsaws Arusha | OHGS Hardware',
    'EDON Air Compressors in Arusha | OHGS':'EDON Air Compressors Arusha | OHGS',
    'EDON Road Cutter in Arusha | OHGS Hardware':'EDON Road Cutter Arusha | OHGS Hardware',
    'Engine-Powered Water Pumps in Arusha | OHGS':'Pampu za Maji za Injini Arusha | OHGS',
    'Hand Tools & Accessories in Arusha | OHGS':'Zana za Mkono na Vifaa Vyake Arusha | OHGS',
    'Power Tools in Arusha | OHGS Hardware':'Zana za Umeme Arusha | OHGS Hardware',
    'FERREX Pressure Washers in Arusha | OHGS':'FERREX Pressure Washers Arusha | OHGS',
    'Submersible Water Pumps in Arusha | OHGS':'Pampu za Kuzamisha Majini Arusha | OHGS',
    'Plywood & Wood Boards in Arusha | OHGS':'Plywood na Bodi za Mbao Arusha | OHGS',
    'Deploy Test':'Jaribio la Uchapishaji',
    'Deploy Test | OHGS Hardware':'Jaribio la Uchapishaji | OHGS Hardware',
    'Open home':'Fungua ukurasa wa mwanzo',
    'Version check':'Angalia toleo',
    'Directions':'Maelekezo',
    'Get directions':'Pata maelekezo',
    'Quick links':'Viungo vya haraka',
    'Back to products':'Rudi kwenye bidhaa',
    'Back to top':'Rudi juu',
    'View products':'Tazama bidhaa',
    'View details':'Tazama maelezo',
    'Related products':'Bidhaa zinazohusiana',
    'Reach OHGS':'Wasiliana na OHGS',
    'Message OHGS':'Tuma ujumbe kwa OHGS',
    'Message':'Ujumbe',
    'Name':'Jina',
    'Send inquiry':'Tuma ombi',
    'Open WhatsApp':'Fungua WhatsApp',
    'Main navigation':'Menyu kuu',
    'Open menu':'Fungua menyu',
    'Close menu':'Funga menyu',
    'Switch theme':'Badili mwonekano',
    'Switch dark and light mode':'Badili kati ya mwonekano wa giza na mwanga',
    'Switch to light mode':'Badili kuwa mwonekano wa mwanga',
    'Switch to dark mode':'Badili kuwa mwonekano wa giza',
    'Open OHGS on Instagram':'Fungua OHGS kwenye Instagram',
    'Your name':'Jina lako',
    'Your phone number':'Namba yako ya simu',
    'What product are you looking for?':'Unatafuta bidhaa gani?',
    'How to order from OHGS':'Jinsi ya kuagiza kutoka OHGS',
    'Three ordering steps':'Hatua tatu za kuagiza',
    'Quick order actions':'Vitendo vya kuagiza haraka',
    'Google Maps location for Olotu Hardware and General Supply Ltd on Uhuru Road, Arusha':'Mahali pa Olotu Hardware and General Supply Ltd kwenye Google Maps, Uhuru Road, Arusha',
    'Contact details printed on the Nanenane artwork':'Mawasiliano yaliyo kwenye picha ya Nanenane',
    'Building boards and sheet materials':'Bodi za ujenzi na vifaa vya sheet',
    'EDON AD-21A cordless drill demonstration':'Onyesho la drili ya betri EDON AD-21A',
    'Equipment for construction and site projects':'Vifaa vya ujenzi na miradi ya maeneo ya kazi',
    'Full shop and product-range tour':'Ziara kamili ya duka na aina za bidhaa',
    'More OHGS videos on the Home page':'Video zaidi za OHGS kwenye ukurasa wa Mwanzo',
    'Play the EDON AD-21A drill demonstration':'Cheza onyesho la drili ya EDON AD-21A',
    'Play the OHGS team message':'Cheza ujumbe wa timu ya OHGS',
    'Safety wear and workshop accessories':'Mavazi ya usalama na vifaa vya karakana',
    'Staff-led OHGS showroom tour':'Ziara ya showroom ya OHGS inayoongozwa na mfanyakazi',
    'Tool cabinet and cutting accessories':'Kabati la zana na vifaa vya kukata',
    'Wide OHGS showroom walkthrough':'Ziara pana ya showroom ya OHGS',
    'Order on WhatsApp':'Agiza kwa WhatsApp',
    'Order or reserve by WhatsApp':'Agiza au hifadhi kwa WhatsApp',
    'Ask price on WhatsApp':'Uliza bei kwa WhatsApp',
    'Ask for price':'Uliza bei',
    'Ask for current price':'Uliza bei ya sasa',
    'Check availability today':'Thibitisha upatikanaji leo',
    'Phone / WhatsApp':'Simu / WhatsApp',
    'Location':'Mahali',
    'Location: Uhuru Road, Arusha':'Mahali: Uhuru Road, Arusha',
    'Why OHGS':'Kwa nini OHGS',
    'Good for':'Inafaa kwa',
    'Product selection':'Uchaguzi wa bidhaa',
    'Project supply':'Ugavi wa miradi',
    'WhatsApp ordering':'Kuagiza kwa WhatsApp',
    'Ask about a product':'Uliza kuhusu bidhaa',
    'Power Tools':'Zana za Umeme',
    'Power Tools & Accessories':'Zana za Umeme na Vifaa Vyake',
    'Assorted Power Tools':'Zana Mbalimbali za Umeme',
    'Hand Tools':'Zana za Mkono',
    'Hand Tools & Accessories':'Zana za Mkono na Vifaa Vyake',
    'Tool Kits':'Seti za Zana',
    'Cordless Tools':'Zana za Betri',
    'Pumps & Plumbing':'Pampu na Mabomba',
    'Water Pumps':'Pampu za Maji',
    'Water Transfer Equipment':'Vifaa vya Kuhamisha Maji',
    'Submersible Water Pumps':'Pampu za Maji za Kuzamishwa',
    'Engine-Powered Water Pumps':'Pampu za Maji za Injini',
    'Power Equipment':'Vifaa vya Injini',
    'Construction Equipment':'Vifaa vya Ujenzi',
    'Building Materials':'Vifaa vya Ujenzi',
    'Road & Construction':'Barabara na Ujenzi',
    'Compaction Equipment':'Vifaa vya Kukandamiza Udongo',
    'Site Equipment':'Vifaa vya Eneo la Kazi',
    'Cleaning Equipment':'Vifaa vya Usafi',
    'Garden Equipment':'Vifaa vya Bustani',
    'Outdoor Power':'Vifaa vya Nje vya Injini',
    'Workshop Equipment':'Vifaa vya Karakana',
    'Adhesives':'Gundi',
    'Chainsaws':'Misumeno ya Injini',
    'Plywood & Wood Boards':'Plywood na Bodi za Mbao',
    'EDON Air Compressors':'Compressor za Hewa za EDON',
    'FERREX Pressure Washer':'Mashine ya Kuosha kwa Shinikizo FERREX',
    'EDON 18V Cordless Grass Trimmer':'Mashine ya Betri EDON 18V ya Kukata Nyasi',
    'EDON ED-HR100 Gasoline Tamping Rammer':'EDON ED-HR100 Mashine ya Petroli ya Kukandamiza Udongo',
    'EDON ED-WLQ500 Gasoline Road Cutter':'EDON ED-WLQ500 Mashine ya Petroli ya Kukata Barabara',
    'Assorted Power Tools | OHGS Hardware':'Zana Mbalimbali za Umeme | OHGS Hardware',
    'Hand Tools & Accessories | OHGS Hardware':'Zana za Mkono na Vifaa Vyake | OHGS Hardware',
    'Chainsaws | OHGS Hardware':'Misumeno ya Injini | OHGS Hardware',
    'Plywood & Wood Boards | OHGS Hardware':'Plywood na Bodi za Mbao | OHGS Hardware',
    'EDON Air Compressors | OHGS Hardware':'Compressor za Hewa za EDON | OHGS Hardware',
    'FERREX Pressure Washer | OHGS Hardware':'Mashine ya Kuosha kwa Shinikizo FERREX | OHGS Hardware',
    'EDON 18V Cordless Grass Trimmer | OHGS Hardware':'Mashine ya Betri EDON 18V ya Kukata Nyasi | OHGS Hardware',
    'EDON ED-HR100 Gasoline Tamping Rammer | OHGS Hardware':'EDON ED-HR100 Mashine ya Kukandamiza Udongo | OHGS Hardware',
    'EDON ED-WLQ500 Gasoline Road Cutter | OHGS Hardware':'EDON ED-WLQ500 Mashine ya Kukata Barabara | OHGS Hardware',
    'Submersible Water Pumps | OHGS Hardware':'Pampu za Maji za Kuzamishwa | OHGS Hardware',
    'Engine-Powered Water Pumps | OHGS Hardware':'Pampu za Maji za Injini | OHGS Hardware',
    'Ask OHGS for price, availability or product advice.':'Uliza OHGS kuhusu bei, upatikanaji au ushauri wa bidhaa.',
    'Ask for today’s price, availability and the correct model for your project.':'Uliza bei ya leo, upatikanaji na modeli sahihi kwa mradi wako.',
    'Browse categories, then message OHGS for today’s price, availability and the right model for your job.':'Tazama makundi ya bidhaa, kisha tuma ujumbe kwa OHGS kupata bei ya leo, upatikanaji na modeli sahihi kwa kazi yako.',
    'Clear product guidance, WhatsApp ordering, and practical support so customers can choose the right tool before spending money.':'Ushauri wazi wa bidhaa, kuagiza kwa WhatsApp na msaada wa vitendo ili wateja wachague zana sahihi kabla ya kutumia fedha.',
    'Built for contractors, farms, homes and workshops.':'Imetayarishwa kwa wakandarasi, mashamba, nyumba na karakana.',
    'Current highlights and ready-to-order products.':'Bidhaa zinazoangaziwa sasa na zilizo tayari kuagizwa.',
    'Customers can browse categories, ask questions and order directly through WhatsApp. The site is built to work smoothly on phones, tablets and desktops.':'Wateja wanaweza kutazama makundi, kuuliza maswali na kuagiza moja kwa moja kupitia WhatsApp. Tovuti inafanya kazi vizuri kwenye simu, tablet na kompyuta.',
    'From construction to farming and workshop jobs, OHGS supports customers with practical equipment.':'Kuanzia ujenzi hadi kilimo na kazi za karakana, OHGS huwasaidia wateja kwa vifaa vinavyofaa.',
    'Get help choosing the right model for farms, homes, workshops and construction sites.':'Pata msaada wa kuchagua modeli sahihi kwa mashamba, nyumba, karakana na maeneo ya ujenzi.',
    'Hardware tools, pumps, construction equipment and reliable site supplies in Arusha.':'Zana, pampu, vifaa vya ujenzi na bidhaa za kuaminika kwa maeneo ya kazi Arusha.',
    'In-store product guidance · OHGS Arusha':'Ushauri wa bidhaa dukani · OHGS Arusha',
    'Message OHGS for the latest price and availability before items move.':'Tuma ujumbe kwa OHGS kupata bei na upatikanaji wa sasa kabla bidhaa hazijaisha.',
    'OHGS helps customers choose tools, pumps and equipment that match their work instead of guessing.':'OHGS huwasaidia wateja kuchagua zana, pampu na vifaa vinavyolingana na kazi zao bila kubahatisha.',
    'OHGS showroom, products and customer support.':'Showroom ya OHGS, bidhaa na huduma kwa wateja.',
    'Olotu Hardware & General Supply LTD serves customers who need practical tools, pumps, machines and site equipment.':'Olotu Hardware & General Supply LTD huhudumia wateja wanaohitaji zana, pampu, mashine na vifaa vya maeneo ya kazi.',
    'Product guidance, ordering and site supply support.':'Ushauri wa bidhaa, kuagiza na msaada wa ugavi wa maeneo ya kazi.',
    'Reliable hardware supply in Arusha.':'Ugavi wa vifaa vya hardware unaoaminika Arusha.',
    'Send a quick request and the team can reply with current details.':'Tuma ombi fupi na timu itakujibu kwa maelezo ya sasa.',
    'Send your request, confirm availability and reserve products quickly.':'Tuma ombi lako, thibitisha upatikanaji na uhifadhi bidhaa kwa haraka.',
    'Shop OHGS products by category.':'Nunua bidhaa za OHGS kwa makundi.',
    'Simple, clear and customer-focused.':'Rahisi, wazi na inayomweka mteja mbele.',
    'Support for tools, construction supplies, cleaning equipment and outdoor power needs.':'Msaada kwa zana, vifaa vya ujenzi, vifaa vya usafi na mahitaji ya vifaa vya nje vya injini.',
    'Tools and equipment for real work sites.':'Zana na vifaa kwa maeneo halisi ya kazi.',
    'Tools and equipment · Available from OHGS Arusha':'Zana na vifaa · Vinapatikana OHGS Arusha',
    'A quick look at available tools, machines and store support.':'Muonekano mfupi wa zana, mashine na huduma zinazopatikana dukani.',
    'A range of submersible pumps for water transfer in homes, farms and construction sites. Ask OHGS to confirm the right power and outlet size.':'Aina mbalimbali za pampu za kuzamishwa kwa kuhamisha maji nyumbani, mashambani na maeneo ya ujenzi. Uliza OHGS kuthibitisha nguvu na ukubwa sahihi wa njia ya kutoa maji.',
    'Assorted drills, grinders, cutters and other power tools for construction, repair and workshop jobs. Ask OHGS to confirm the exact model.':'Drili, grinder, mashine za kukata na zana nyingine za umeme kwa ujenzi, matengenezo na kazi za karakana. Uliza OHGS kuthibitisha modeli sahihi.',
    'Chainsaws and outdoor cutting equipment for farm, timber and maintenance work. Ask OHGS to confirm engine size, bar length and available brand.':'Misumeno ya injini na vifaa vya kukata vya nje kwa mashamba, mbao na matengenezo. Uliza OHGS kuthibitisha ukubwa wa injini, urefu wa blade na chapa iliyopo.',
    'EDON 18V cordless grass trimmer kit for garden, yard and outdoor maintenance. Ask OHGS to confirm the included battery and accessories.':'Seti ya mashine ya betri EDON 18V ya kukata nyasi kwa bustani, kiwanja na matengenezo ya nje. Uliza OHGS kuthibitisha betri na vifaa vilivyomo.',
    'EDON air compressors for garages, workshops and pneumatic work. Ask OHGS to confirm tank size, pressure and power.':'Compressor za hewa za EDON kwa gereji, karakana na zana za hewa. Uliza OHGS kuthibitisha ukubwa wa tanki, shinikizo na nguvu.',
    'EDON ED-HR100 gasoline tamping rammer for soil compaction and foundation preparation. The pictured poster lists TSH 1,050,000; confirm today’s price with OHGS.':'Mashine ya petroli EDON ED-HR100 kwa kukandamiza udongo na kuandaa msingi. Poster inaonyesha TSH 1,050,000; thibitisha bei ya leo na OHGS.',
    'EDON ED-WLQ500 gasoline road cutter for road works and concrete cutting. The pictured poster lists TSH 1,550,000; confirm today’s price with OHGS.':'Mashine ya petroli EDON ED-WLQ500 kwa kazi za barabara na kukata zege. Poster inaonyesha TSH 1,550,000; thibitisha bei ya leo na OHGS.',
    'FERREX pressure washer with hose for vehicles, floors, equipment and outdoor cleaning. Ask OHGS to confirm pressure, flow and included accessories.':'Mashine ya FERREX ya kuosha kwa shinikizo yenye hose kwa magari, sakafu, vifaa na usafi wa nje. Uliza OHGS kuthibitisha shinikizo, mtiririko na vifaa vilivyomo.',
    'Hand tools and everyday workshop accessories displayed in the OHGS shop. Ask OHGS to confirm the size, set and brand you need.':'Zana za mkono na vifaa vya kila siku vya karakana vilivyoonyeshwa dukani OHGS. Uliza OHGS kuthibitisha ukubwa, seti na chapa unayohitaji.',
    'Plywood and wood boards for furniture, formwork and finishing jobs. Ask OHGS to confirm sheet type, thickness, size and current stock.':'Plywood na bodi za mbao kwa samani, formwork na kazi za finishing. Uliza OHGS kuthibitisha aina ya sheet, unene, ukubwa na stok ya sasa.',
    'Portable engine-powered pumps for water transfer, irrigation and site drainage. Ask OHGS to confirm engine type, inlet size and capacity.':'Pampu zinazobebeka za injini kwa kuhamisha maji, umwagiliaji na kuondoa maji eneo la kazi. Uliza OHGS kuthibitisha aina ya injini, ukubwa wa njia ya kuingiza maji na uwezo.',
    'If you can see this page, the GitHub/Vercel root files are loading correctly.':'Ukiweza kuona ukurasa huu, mafaili ya msingi ya GitHub/Vercel yanapakia vizuri.',
    'OHGS deployment is working.':'Uchapishaji wa OHGS unafanya kazi.',
    'OHGS deploy test page.':'Ukurasa wa jaribio la uchapishaji wa OHGS.',
    'Your browser does not support this video.':'Kivinjari chako hakitumii video hii.',
    '© 2026 OHGS Hardware. Website by Isaac Sabuni.':'© 2026 OHGS Hardware. Tovuti imetengenezwa na Isaac Sabuni.',
    '✅ Arusha-based customer support':'✅ Huduma kwa wateja ya Arusha',
    '✅ Ask for inlet size, outlet size and pumping capacity':'✅ Uliza ukubwa wa njia ya kuingiza na kutoa maji pamoja na uwezo wa pampu',
    '✅ Ask for maximum head and flow rate':'✅ Uliza kiwango cha juu cha kusukuma na mtiririko wa maji',
    '✅ Ask for the available brand and included pieces':'✅ Uliza chapa iliyopo na vipande vilivyomo',
    '✅ Ask for the required thickness':'✅ Uliza unene unaohitajika',
    '✅ Ask OHGS about compatible safety equipment':'✅ Uliza OHGS kuhusu vifaa vya usalama vinavyofaa',
    '✅ Ask which accessories are included':'✅ Uliza vifaa gani vimejumuishwa',
    '✅ Ask which battery or accessories are included':'✅ Uliza betri au vifaa gani vimejumuishwa',
    '✅ Ask which hose, gun and nozzles are included':'✅ Uliza hose, bunduki na nozzles zipi zimejumuishwa',
    '✅ Check today’s brand and stock':'✅ Thibitisha chapa na stok ya leo',
    '✅ Check today’s stock with OHGS':'✅ Thibitisha stok ya leo na OHGS',
    '✅ Confirm board type and sheet size':'✅ Thibitisha aina ya bodi na ukubwa wa sheet',
    '✅ Confirm compatible blade size before buying':'✅ Thibitisha ukubwa wa blade unaofaa kabla ya kununua',
    '✅ Confirm engine and maintenance requirements':'✅ Thibitisha injini na mahitaji ya matengenezo',
    '✅ Confirm engine size and guide-bar length':'✅ Thibitisha ukubwa wa injini na urefu wa guide bar',
    '✅ Confirm maximum pressure and water flow':'✅ Thibitisha shinikizo la juu na mtiririko wa maji',
    '✅ Confirm pump power and outlet size before buying':'✅ Thibitisha nguvu ya pampu na ukubwa wa njia ya kutoa maji kabla ya kununua',
    '✅ Confirm tank size, pressure and motor power':'✅ Thibitisha ukubwa wa tanki, shinikizo na nguvu ya mota',
    '✅ Confirm the battery supplied with the kit':'✅ Thibitisha betri inayotolewa pamoja na seti',
    '✅ Confirm the correct tool size or set':'✅ Thibitisha ukubwa au seti sahihi ya zana',
    '✅ Confirm the exact tool model and power rating':'✅ Thibitisha modeli sahihi ya zana na kiwango cha nguvu',
    '✅ Confirm today’s price and stock with OHGS':'✅ Thibitisha bei na stok ya leo na OHGS',
    '✅ Confirm whether the available engine is petrol or diesel':'✅ Thibitisha kama injini iliyopo ni ya petroli au dizeli',
    '✅ Construction, repairs and workshop jobs':'✅ Ujenzi, matengenezo na kazi za karakana',
    '✅ Farm, timber and outdoor maintenance work':'✅ Kazi za shamba, mbao na matengenezo ya nje',
    '✅ Fast product inquiry':'✅ Kuuliza bidhaa kwa haraka',
    '✅ Furniture, formwork and finishing work':'✅ Samani, formwork na kazi za finishing',
    '✅ Garages, workshops and pneumatic tools':'✅ Gereji, karakana na zana za hewa',
    '✅ Garden, yard and outdoor maintenance':'✅ Bustani, kiwanja na matengenezo ya nje',
    '✅ Homes, farms and construction-site water transfer':'✅ Kuhamisha maji majumbani, mashambani na maeneo ya ujenzi',
    '✅ Mobile-friendly ordering':'✅ Kuagiza kwa urahisi kupitia simu',
    '✅ Road works and concrete cutting':'✅ Kazi za barabara na kukata zege',
    '✅ Site and workshop equipment':'✅ Vifaa vya eneo la kazi na karakana',
    '✅ Soil compaction and foundation preparation':'✅ Kukandamiza udongo na kuandaa msingi',
    '✅ The pictured poster lists TSH 1,050,000':'✅ Poster kwenye picha inaonyesha TSH 1,050,000',
    '✅ The pictured poster lists TSH 1,550,000':'✅ Poster kwenye picha inaonyesha TSH 1,550,000',
    '✅ Vehicles, floors, equipment and outdoor cleaning':'✅ Magari, sakafu, vifaa na usafi wa nje',
    '✅ Water transfer, irrigation and site drainage':'✅ Kuhamisha maji, umwagiliaji na kuondoa maji eneo la kazi',
    '✅ Workshop, repair and site jobs':'✅ Kazi za karakana, matengenezo na maeneo ya kazi',
    '🏪 Arusha showroom':'🏪 Showroom ya Arusha',
    '💬 WhatsApp-first ordering':'💬 Kuagiza kwa WhatsApp kwanza',
    '🚜 Farm, home and site support':'🚜 Msaada wa shamba, nyumbani na eneo la kazi',
    '🛠️ Tools and equipment':'🛠️ Zana na vifaa'
  };
  var SW_FALLBACKS=[
    [/\bAsk OHGS to confirm\b/g,'Uliza OHGS kuthibitisha'],
    [/\bAsk OHGS\b/g,'Uliza OHGS'],
    [/\bAsk for\b/g,'Uliza'],
    [/\bCheck availability\b/g,'Thibitisha upatikanaji'],
    [/\bConfirm availability\b/g,'Thibitisha upatikanaji'],
    [/\bcurrent stock\b/gi,'stok ya sasa'],
    [/\btoday’s price\b/gi,'bei ya leo'],
    [/\bproduct guidance\b/gi,'ushauri wa bidhaa'],
    [/\bconstruction sites\b/gi,'maeneo ya ujenzi'],
    [/\bconstruction\b/gi,'ujenzi'],
    [/\bworkshop\b/gi,'karakana'],
    [/\bproducts\b/gi,'bidhaa'],
    [/\bequipment\b/gi,'vifaa'],
    [/\btools\b/gi,'zana'],
    [/\bwater\b/gi,'maji'],
    [/\bprice\b/gi,'bei'],
    [/\bavailable\b/gi,'inayopatikana']
  ];
  var OHGS_META_DESCRIPTION_EN='OHGS Hardware & General Supply LTD supplies tools, pumps, and construction equipment in Arusha.';
  var OHGS_META_DESCRIPTION_SW='OHGS Hardware & General Supply LTD inauza zana, pampu na vifaa vya ujenzi Arusha.';
  function translatedText(value){
    var exact=SW_TEXT[value];
    if(exact)return exact;
    var result=value;
    SW_FALLBACKS.forEach(function(rule){result=result.replace(rule[0],rule[1])});
    return result;
  }
  function translateLooseText(lang){
    if(!document.body)return;
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);
    var nodes=[];var node;
    while((node=walker.nextNode()))nodes.push(node);
    nodes.forEach(function(textNode){
      var parent=textNode.parentElement;
      if(!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(parent.tagName))return;
      if(parent.hasAttribute('data-en') && parent.hasAttribute('data-sw'))return;
      if(typeof textNode.__ohgsEnglishText!=='string')textNode.__ohgsEnglishText=textNode.nodeValue;
      var english=textNode.__ohgsEnglishText;
      var trimmed=english.trim();
      if(!trimmed)return;
      var leading=(english.match(/^\s*/)||[''])[0];
      var trailing=(english.match(/\s*$/)||[''])[0];
      textNode.nodeValue=lang==='sw'?leading+translatedText(trimmed)+trailing:english;
    });
  }
  function translateAttributes(lang){
    qsa('[placeholder],[title],[aria-label]').forEach(function(el){
      ['placeholder','title','aria-label'].forEach(function(name){
        if(!el.hasAttribute(name))return;
        var key='__ohgsEnglish'+name.replace(/(^|-)([a-z])/g,function(_,dash,letter){return letter.toUpperCase()});
        if(typeof el[key]!=='string')el[key]=el.getAttribute(name);
        el.setAttribute(name,lang==='sw'?translatedText(el[key]):el[key]);
      });
    });
  }
  function translateMetadata(lang){
    if(typeof document.__ohgsEnglishTitle!=='string')document.__ohgsEnglishTitle=document.title;
    document.title=lang==='sw'?translatedText(document.__ohgsEnglishTitle):document.__ohgsEnglishTitle;
    qsa('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]').forEach(function(meta){
      if(typeof meta.__ohgsEnglishContent!=='string')meta.__ohgsEnglishContent=meta.getAttribute('content')||'';
      var english=meta.__ohgsEnglishContent;
      var sw=english===OHGS_META_DESCRIPTION_EN?OHGS_META_DESCRIPTION_SW:translatedText(english);
      meta.setAttribute('content',lang==='sw'?sw:english);
    });
  }
  function killLoader(){
    document.body.classList.add('ohgs-ready','ohgs-site-ready');
    document.documentElement.style.overflow=''; document.body.style.overflow='';
    qsa('.loader,#loader,.ohgs-loader-screen,[class*="preloader"],[class*="loading-screen"]').forEach(function(el){el.hidden=true;el.style.display='none';el.style.opacity='0';el.style.visibility='hidden';el.style.pointerEvents='none'});
    var main=qs('main'); if(main){main.style.display='block';main.style.opacity='1';main.style.visibility='visible'}
  }
  function applyTheme(mode){
    if(window.OHGSTheme){
      if(mode==='light'||mode==='dark')window.OHGSTheme.apply(mode,false);
      else window.OHGSTheme.restore();
      return;
    }
    var explicit=mode==='light'||mode==='dark';
    mode = mode || (window.OHGSBoot&&window.OHGSBoot.readTheme()) || storageGet('ohgs-theme',document.documentElement.getAttribute('data-theme')||'dark');
    mode = mode === 'light' ? 'light' : 'dark';
    var light = mode === 'light';
    var root = document.documentElement;
    root.classList.toggle('light',light);
    document.body.classList.toggle('light',light);
    root.setAttribute('data-theme',mode);
    document.body.setAttribute('data-theme',mode);
    root.style.colorScheme=mode;
    if(explicit){if(window.OHGSBoot)window.OHGSBoot.saveTheme(mode);else storageSet('ohgs-theme',mode)}
    var themeColor=qs('meta[name="theme-color"]');
    if(themeColor)themeColor.setAttribute('content',light?'#f7fbff':'#07111f');
    var sun='<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path></svg>';
    var moon='<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z"></path></svg>';
    var sw=root.lang==='sw';
    var label=light?(sw?'Badili kuwa mwonekano wa giza':'Switch to dark mode'):(sw?'Badili kuwa mwonekano wa mwanga':'Switch to light mode');
    qsa('.theme-toggle').forEach(function(btn){
      btn.innerHTML='<span class="theme-icon '+(light?'theme-icon-sun':'theme-icon-moon')+'" aria-hidden="true">'+(light?sun:moon)+'</span>';
      btn.setAttribute('aria-label',label);
      btn.setAttribute('title',label);
      btn.setAttribute('aria-pressed',light?'true':'false');
      btn.setAttribute('data-mode',mode);
    });
  }
  function applyLang(lang){
    lang = lang || storageGet('ohgs-lang','en');
    lang=lang==='sw'?'sw':'en';
    document.documentElement.lang = lang;
    document.body.classList.toggle('sw',lang==='sw');
    storageSet('ohgs-lang',lang);
    qsa('[data-en][data-sw]').forEach(function(el){el.textContent = el.getAttribute(lang==='sw'?'data-sw':'data-en') || el.textContent});
    translateLooseText(lang);
    translateAttributes(lang);
    translateMetadata(lang);
    qsa('.lang-toggle').forEach(function(btn){
      btn.textContent=lang==='sw'?'English':'Kiswahili';
      btn.setAttribute('lang',lang==='sw'?'en':'sw');
      btn.setAttribute('aria-label',lang==='sw'?'Change website language to English':'Badili lugha ya tovuti kuwa Kiswahili');
      btn.setAttribute('title',lang==='sw'?'Change to English':'Badili kuwa Kiswahili');
      btn.setAttribute('aria-pressed',lang==='sw'?'true':'false');
    });
    applyTheme(document.documentElement.getAttribute('data-theme'));
    try{window.dispatchEvent(new CustomEvent('ohgs:languagechange',{detail:{language:lang}}))}catch(e){}
  }
  function bind(){
    var menu=qs('.menu-toggle'), nav=qs('.nav-links');
    if(menu && nav && menu.dataset.bound!=='1'){
      function setMenu(open){
        nav.classList.toggle('open',open);
        menu.classList.toggle('is-open',open);
        menu.setAttribute('aria-expanded',open?'true':'false');
        var sw=document.documentElement.lang==='sw';
        menu.setAttribute('aria-label',open?(sw?'Funga menyu':'Close menu'):(sw?'Fungua menyu':'Open menu'));
      }
      menu.dataset.bound='1';
      menu.setAttribute('aria-controls','ohgs-main-navigation');
      menu.setAttribute('aria-expanded','false');
      nav.id='ohgs-main-navigation';
      menu.addEventListener('click',function(e){e.preventDefault();setMenu(!nav.classList.contains('open'))});
      nav.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
      document.addEventListener('click',function(e){if(!e.target.closest('.site-header'))setMenu(false)});
      document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
    }
    if(!window.OHGSTheme)qsa('.theme-toggle').forEach(function(btn){if(btn.dataset.bound==='1')return;btn.dataset.bound='1';btn.addEventListener('click',function(e){e.preventDefault();applyTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light')})});
    qsa('.lang-toggle').forEach(function(btn){if(btn.dataset.bound==='1')return;btn.dataset.bound='1';btn.addEventListener('click',function(e){e.preventDefault();applyLang(document.documentElement.lang==='sw'?'en':'sw')})});
  }
  function header(){
    var h=qs('.site-header'); if(!h)return;
    h.classList.remove('hide','hidden','is-hidden','header-hidden','nav-hidden','scroll-hide');
    document.body.classList.remove('hide-header','header-hidden','nav-hidden');
    h.style.position='fixed';h.style.top='0';h.style.left='0';h.style.right='0';h.style.opacity='1';h.style.visibility='visible';h.style.transform='translateY(0)';h.style.zIndex='999999';
    var y=Math.max(0,window.scrollY||window.pageYOffset||0);
    // Different enter/leave thresholds prevent bouncing near the top on touch screens.
    var compact=h.classList.contains('ohgs-header-compact')?y>24:y>80;
    h.classList.toggle('ohgs-header-compact',compact);
    h.classList.toggle('scrolled',compact);
    var range=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
    h.style.setProperty('--page-progress',range?Math.min(1,y/range).toFixed(4):'0');
  }
  function media(){
    qsa('img').forEach(function(img){
      img.style.opacity='1'; img.style.visibility='visible'; img.decoding='async';
      if(!img.hasAttribute('loading'))img.loading=img.closest('.site-header')?'eager':'lazy';
      if(!img.dataset.fallbackBound){img.dataset.fallbackBound='1';img.addEventListener('error',function(){if(img.src.indexOf('ohgs-image-fallback.svg')<0){img.removeAttribute('srcset');img.src='media/ohgs-image-fallback.svg'}})}
    });
    qsa('video').forEach(function(v){v.preload='none';v.playsInline=true;v.controls=!v.dataset.videoSrc||!!v.closest('.media-player.is-loaded')});
  }
  function run(){killLoader();applyTheme();applyLang();bind();header();media()}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  window.addEventListener('pageshow',function(){killLoader();applyTheme();applyLang();header()});
  window.addEventListener('storage',function(e){if(e.key==='ohgs-theme')applyTheme(e.newValue);if(e.key==='ohgs-lang')applyLang(e.newValue)});
  window.addEventListener('orientationchange',header,{passive:true});
  window.addEventListener('resize',header,{passive:true});
  var headerScheduled=false;
  window.addEventListener('scroll',function(){
    if(headerScheduled)return;
    headerScheduled=true;
    window.requestAnimationFrame(function(){headerScheduled=false;header()});
  },{passive:true});
  setTimeout(killLoader,1200);
})();
