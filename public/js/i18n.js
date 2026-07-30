/**
 * Shri Saileela Palkhi - Internationalization & Language Switcher (i18n)
 * Supports: English (en), Hindi (hi), Marathi (mr)
 */

const translations = {
  en: {
    // Top Bar & Header
    est_label: "Est. Year: 1988",
    reg_label: "Reg No: E-3892 Mumbai",
    live_yatra_badge: "LIVE YATRA",
    announcement_text: "Shri Saileela Palkhi Sohala 2026 is currently at Talegaon Dabhade Halt. Next stop: Rajgurunagar Ashram.",
    control_room: "Control Room:",
    emergency_desk: "Emergency Desk:",
    nav_home: "Home",
    nav_schedule: "Route Schedule",
    nav_pass: "Devotee Gate Pass",
    nav_verify: "Verify Pass",
    nav_donate: "Seva Donation",
    nav_admin: "Admin Desk",
    live_darshan_btn: "Live Darshan",

    // Hero Section
    hero_badge: "Sacred Shirdi Pilgrimage 2026",
    hero_title: "Shri Saileela Palkhi Sohala & Seva Yatra",
    hero_subtitle: "Join thousands of Varkaris on the holy pilgrimage from Mumbai to Shirdi. Get your official pilgrim gate pass, track live Palkhi halts, and support Annadan Seva.",
    btn_get_pass: "Get Official Pilgrim Pass",
    btn_view_route: "View Route & Halts",
    btn_support_annadan: "Support Annadan Seva",

    // Live Tracker Card
    tracker_title: "Live Yatra Tracker",
    tracker_subtitle: "Real-time GPS & Halt Status",
    live_now: "LIVE NOW",
    current_location: "Current Location",
    next_halt: "Next Halt",
    distance_covered: "Distance Covered",
    meals_served: "Meals Served Today",
    route_progress: "Overall Route Progress",
    day_label: "Day",

    // Counter Metrics
    metric_devotees: "Varkaris Registered",
    metric_meals: "Annadan Meals Served",
    metric_distance: "Total Route KM",
    metric_volunteers: "Active Seva Volunteers",

    // Devotee Services
    services_tag: "Devotee Assistance & Facilities",
    services_title: "Serving the Varkaris with Devotion",
    services_subtitle: "Shri Sai Leela Seva Trust provides 24/7 comprehensive facilities along the entire 265 KM Palkhi route.",
    srv_pass_title: "Official Pilgrim Gate Pass",
    srv_pass_desc: "Register online to receive your QR-coded Devotee Gate Pass for priority entry at all Palkhi halts and Shirdi Samadhi Mandir queue.",
    srv_pass_btn: "Register Pass →",
    srv_annadan_title: "Mahaprasad & Annadan Seva",
    srv_annadan_desc: "Serving hygienic hot breakfast, tea, drinking water, and evening Mahaprasad to over 15,000+ devotees daily across all halt camps.",
    srv_annadan_btn: "Sponsor Mahaprasad →",
    srv_medical_title: "24/7 Medical & Ambulance Desk",
    srv_medical_desc: "Equipped with doctor teams, mobile emergency ambulances, footwear relief, and foot massage centers for weary Varkaris.",
    srv_medical_btn: "View Medical Camps →",

    // Schedule Timeline
    itinerary_tag: "Pilgrimage Itinerary",
    itinerary_title: "Upcoming Palkhi Halts & Seva Camps",
    itinerary_subtitle: "Check schedule, halt grounds, and medical desk emergency contacts.",
    view_full_schedule: "View Complete 11-Day Schedule →",

    // Seva Callout
    callout_title: "Support Palkhi Annadan Seva",
    callout_desc: "Your contribution directly provides food, water, and medical care to thousands of pilgrims walking to Shirdi. All donations are 50% tax exempt under Section 80G.",
    donate_now_btn: "Donate Online Now (Instant 80G Receipt)",

    // Donation Page
    donate_tag: "80G Tax-Exempt Seva Contribution",
    donate_title: "Online Seva & Annadan Portal",
    donate_subtitle: "Contribute to Mahaprasad, medical camps, and Palkhi facilities. All donations receive an instant 50% tax deduction certificate under Section 80G.",
    select_preset: "Select Seva Donation Amount (₹)",
    custom_amount: "Custom Amount (₹) *",
    seva_category: "Seva Category *",
    donor_name: "Donor Full Name *",
    donor_phone: "Mobile Phone Number *",
    donor_email: "Email Address (for PDF Receipt)",
    donor_pan: "PAN Card Number (Required for 80G Certificate above ₹2,000)",
    pay_notice: "Secure Payment Gateway: Accepts UPI QR Code, Credit/Debit Cards, NetBanking, and Razorpay.",
    proceed_pay_btn: "💳 Proceed to Seva Payment & Download 80G Receipt",

    // Payment Modal
    modal_title: "Online Seva Payment",
    modal_category: "SEVA CATEGORY",
    modal_amount: "AMOUNT TO PAY",
    tab_upi: "📱 UPI / QR Code",
    tab_card: "💳 Card Payment",
    tab_netbanking: "🏛️ NetBanking",
    upi_scan_instruction: "Scan QR code with GPay, PhonePe, Paytm, or BHIM UPI app:",
    card_name: "Cardholder Name",
    card_number: "Card Number",
    card_exp: "Expiry Date",
    card_cvv: "CVV",
    select_bank: "Select Bank",
    confirm_payment_btn: "Complete Payment & Issue 80G Receipt",

    // Devotee Pass Page
    pass_title: "Official Devotee Gate Pass Registration",
    pass_subtitle: "Fill out the pilgrim details below to generate your instant QR-coded entry pass for Palkhi halts and Shirdi Samadhi Mandir.",
    pass_fullname: "Pilgrim Full Name *",
    pass_age: "Age *",
    pass_gender: "Gender *",
    pass_phone: "Mobile Phone Number *",
    pass_city: "City / Native Town *",
    pass_idtype: "Government ID Type *",
    pass_idnum: "ID Number *",
    pass_dindigroup: "Dindi Group / Mandal Name",
    pass_submit_btn: "Generate Official Pilgrim Pass",

    // Footer
    footer_mandal_info: "Shri Sai Leela Seva Trust (Reg. No. E-3892 Mumbai)",
    footer_tagline: "Dedicated to serving Shirdi Sai Baba Varkaris with unconditional devotion, food, shelter, and medical care.",
    footer_quick_links: "Quick Navigation",
    footer_emergency: "24/7 Emergency Contacts",
    footer_copyright: "© 2026 Shri Sai Leela Seva Trust. All Rights Reserved."
  },

  hi: {
    // Top Bar & Header
    est_label: "स्थापना वर्ष : १९८८",
    reg_label: "नोंदणी क्र. : ई-३८९२ मुंबई",
    live_yatra_badge: "लाइव यात्रा",
    announcement_text: "श्री साईलीला पालखी सोहळा २०२६ सध्या तळेगाव दाभाडे मुक्कामी आहे. पुढील मुक्काम: राजगुरुनगर आश्रम.",
    control_room: "नियंत्रण कक्ष:",
    emergency_desk: "आणीबाणी कक्ष:",
    nav_home: "मुख्य पृष्ठ",
    nav_schedule: "पालखी मार्ग पत्रक",
    nav_pass: "वारकरी पास",
    nav_verify: "पास पडताळणी",
    nav_donate: "सेवा देणगी",
    nav_admin: "प्रशासन",
    live_darshan_btn: "लाइव दर्शन",

    // Hero Section
    hero_badge: "वार्षिक पवित्र शिर्डी पदयात्रा २०२६",
    hero_title: "श्री साईलीला पालखी सोहळा आणि सेवा यात्रा",
    hero_subtitle: "मुंबई ते शिर्डी पदयात्रेत हजारो वारकऱ्यांसोबत सहभागी व्हा. तुमचा अधिकृत वारकरी पास मिळवा, थेट मुक्काम स्थान पाहा आणि अन्नदान सेवेत योगदान द्या.",
    btn_get_pass: "अधिकृत पास मिळवा",
    btn_view_route: "मार्ग व मुक्काम पाहा",
    btn_support_annadan: "अन्नदान सेवेत योगदान द्या",

    // Live Tracker Card
    tracker_title: "लाइव यात्रा ट्रॅकर",
    tracker_subtitle: "थेट जीपीएस व मुक्काम अपडेट",
    live_now: "थेट प्रसारण",
    current_location: "वर्तमान स्थान",
    next_halt: "पुढील मुक्काम",
    distance_covered: "कापलेले अंतर",
    meals_served: "आजचे महाप्रसाद",
    route_progress: "एकूण मार्ग प्रगती",
    day_label: "दिवस",

    // Counter Metrics
    metric_devotees: "नोंदणीकृत वारकरी",
    metric_meals: "वाटप केलेले महाप्रसाद",
    metric_distance: "एकूण किलोमीटर",
    metric_volunteers: "सक्रिय सेवाभावी",

    // Devotee Services
    services_tag: "वारकरी सुविधा आणि मदत",
    services_title: "भक्तीभावाने वारकऱ्यांची सेवा",
    services_subtitle: "श्री साई लीला सेवा ट्रस्ट संपूर्ण २६५ किमी पालखी मार्गावर २४ तास मोफत सुविधा पुरवते.",
    srv_pass_title: "अधिकृत वारकरी पास",
    srv_pass_desc: "पालखी मुक्काम व शिर्डी दर्शन रांगेत प्राधान्य मिळवण्यासाठी क्यूआर-कोडयुक्त अधिकृत पास ऑनलाइन मिळवा.",
    srv_pass_btn: "पास नोंदणी करा →",
    srv_annadan_title: "महाप्रसाद आणि अन्नदान सेवा",
    srv_annadan_desc: "दररोज १५,००० पेक्षा जास्त वारकऱ्यांना गरम नाश्ता, चहा, शुद्ध पिण्याचे पाणी आणि संध्याकाळी महाप्रसाद वाटप.",
    srv_annadan_btn: "अन्नदानात सहभाग घ्या →",
    srv_medical_title: "२४/७ वैद्यकीय आणि रुग्णवाहिका",
    srv_medical_desc: "डॉक्टरांची टीम, फिरती रुग्णवाहिका, मोफत औषधोपचार आणि पाऊल मालिश केंद्रांची सुविधा.",
    srv_medical_btn: "वैद्यकीय कॅम्प पाहा →",

    // Schedule Timeline
    itinerary_tag: "पालखी प्रवास सूची",
    itinerary_title: "आगामी पालखी मुक्काम आणि सेवा कॅम्प",
    itinerary_subtitle: "वेळापत्रक, मुक्काम मैदान आणि आपत्कालीन संपर्क क्रमांक पाहा.",
    view_full_schedule: "संपूर्ण ११ दिवसांचे वेळापत्रक पाहा →",

    // Seva Callout
    callout_title: "पालखी अन्नदान सेवेला पाठिंबा द्या",
    callout_desc: "तुमची देणगी शिर्डीकडे चालणाऱ्या हजारो वारकऱ्यांना अन्न, पाणी आणि वैद्यकीय मदत पुरवते. सर्व देणग्यांना कलम 80G अंतर्गत ५०% कर सवलत मिळतो.",
    donate_now_btn: "आत्ताच ऑनलाइन देणगी द्या (८०जी पावतीसह)",

    // Donation Page
    donate_tag: "80G करसवलत प्राप्त सेवा योगदान",
    donate_title: "ऑनलाइन सेवा आणि अन्नदान पोर्टल",
    donate_subtitle: "महाप्रसाद, वैद्यकीय कॅम्प आणि पालखी सुविधांसाठी तुमचे सहकार्य द्या. सर्व देणग्यांना त्वरित 80G कर सवलत प्रमाणपत्र मिळते.",
    select_preset: "देणगी रक्कम निवडा (₹)",
    custom_amount: "इतर रक्कम (₹) *",
    seva_category: "सेवा प्रकार *",
    donor_name: "देणगीदाराचे पूर्ण नाव *",
    donor_phone: "मोबाईल नंबर *",
    donor_email: "ईमेल पत्ता (पावतीसाठी)",
    donor_pan: "पॅन कार्ड नंबर (२००० रुपयांपेक्षा जास्त देणगीसाठी ८०जी अनिवार्य)",
    pay_notice: "सुरक्षित पेमेंट पद्धत: UPI QR, क्रेडिट/डेबिट कार्ड, नेट बँकिंग आणि Razorpay स्वीकारले जातात.",
    proceed_pay_btn: "💳 पेमेंट करा आणि ८०जी पावती मिळवा",

    // Payment Modal
    modal_title: "ऑनलाइन सेवा देणगी",
    modal_category: "सेवा प्रकार",
    modal_amount: "देय रक्कम",
    tab_upi: "📱 UPI / QR कोड",
    tab_card: "💳 कार्ड पेमेंट",
    tab_netbanking: "🏛️ नेट बँकिंग",
    upi_scan_instruction: "GPay, PhonePe, Paytm किंवा BHIM ॲपद्वारे QR कोड स्कॅन करा:",
    card_name: "कार्डधारकाचे नाव",
    card_number: "कार्ड नंबर",
    card_exp: "वैधता तारीख",
    card_cvv: "CVV",
    select_bank: "बँक निवडा",
    confirm_payment_btn: "पेमेंट पूर्ण करा आणि पावती डाऊनलोड करा",

    // Devotee Pass Page
    pass_title: "अधिकृत वारकरी पास नोंदणी",
    pass_subtitle: "पालखी मुक्काम व शिर्डी दर्शनासाठी तुमचा त्वरित क्यूआर कोड पास मिळवण्यासाठी खालील माहिती भरा.",
    pass_fullname: "वारकऱ्याचे पूर्ण नाव *",
    pass_age: "वय *",
    pass_gender: "लिंग *",
    pass_phone: "मोबाईल नंबर *",
    pass_city: "शहर / मूळ गाव *",
    pass_idtype: "सरकारी ओळखपत्र प्रकार *",
    pass_idnum: "ओळखपत्र क्रमांक *",
    pass_dindigroup: "दिंडी / मंडळाचे नाव",
    pass_submit_btn: "अधिकृत वारकरी पास मिळवा",

    // Footer
    footer_mandal_info: "श्री साई लीला सेवा ट्रस्ट (नोंदणी क्र. ई-३८९२ मुंबई)",
    footer_tagline: "शिर्डी साईबाबांच्या वारकऱ्यांची अन्न, निवारा आणि आरोग्याची निस्वार्थ सेवा.",
    footer_quick_links: "महत्त्वाच्या लिंक्स",
    footer_emergency: "२४/७ आपत्कालीन संपर्क",
    footer_copyright: "© २०२६ श्री साई लीला सेवा ट्रस्ट. सर्व हक्क सुरक्षित."
  },

  mr: {
    // Top Bar & Header
    est_label: "स्थापना वर्ष : १९८८",
    reg_label: "नोंदणी क्र. : ई-३८९२ मुंबई",
    live_yatra_badge: "लाइव्ह सोहळा",
    announcement_text: "🚩 श्री साईलीला पालखी सोहळा २०२६ सध्या तळेगाव दाभाडे मुक्कामी आहे. पुढील मुक्काम: राजगुरुनगर आश्रम.",
    control_room: "नियंत्रण कक्ष:",
    emergency_desk: "आपत्कालीन कक्ष:",
    nav_home: "मुखपृष्ठ",
    nav_schedule: "पालखी मार्ग",
    nav_pass: "वारकरी पास",
    nav_verify: "पास पडताळणी",
    nav_donate: "देणगी",
    nav_admin: "प्रशासन",
    live_darshan_btn: "लाइव्ह दर्शन",

    // Hero Section
    hero_badge: "वार्षिक पवित्र शिर्डी पालखी सोहळा २०२६",
    hero_title: "श्री साईलीला पालखी सोहळा व सेवा यात्रा",
    hero_subtitle: "मुंबई ते शिर्डी पदयात्रेत हजारो वारकऱ्यांसोबत सहभागी व्हा. तुमचा अधिकृत वारकरी पास मिळवा, थेट मुक्काम स्थान पाहा आणि अन्नदान सेवेत योगदान द्या.",
    btn_get_pass: "अधिकृत पास मिळवा",
    btn_view_route: "मार्ग व मुक्काम पाहा",
    btn_support_annadan: "अन्नदान सेवेत सहभाग घ्या",

    // Live Tracker Card
    tracker_title: "लाइव्ह पालखी ट्रॅकर",
    tracker_subtitle: "थेट जीपीएस व मुक्काम माहिती",
    live_now: "लाइव्ह सुरू",
    current_location: "सध्याचे स्थान",
    next_halt: "पुढील मुक्काम",
    distance_covered: "कापलेले अंतर",
    meals_served: "आजचे महाप्रसाद",
    route_progress: "एकूण मार्ग प्रगती",
    day_label: "दिवस",

    // Counter Metrics
    metric_devotees: "नोंदणीकृत वारकरी",
    metric_meals: "वाटप केलेले महाप्रसाद",
    metric_distance: "एकूण किलोमीटर",
    metric_volunteers: "सक्रिय सेवाभावी",

    // Devotee Services
    services_tag: "वारकरी सुविधा आणि मदत",
    services_title: "भक्तीभावाने वारकऱ्यांची सेवा",
    services_subtitle: "श्री साई लीला सेवा ट्रस्ट संपूर्ण २६५ किमी पालखी मार्गावर २४ तास मोफत सुविधा पुरवते.",
    srv_pass_title: "अधिकृत वारकरी पास",
    srv_pass_desc: "पालखी मुक्काम व शिर्डी दर्शन रांगेत प्राधान्य मिळवण्यासाठी क्यूआर-कोडयुक्त अधिकृत पास ऑनलाइन मिळवा.",
    srv_pass_btn: "पास नोंदणी करा →",
    srv_annadan_title: "महाप्रसाद आणि अन्नदान सेवा",
    srv_annadan_desc: "दररोज १५,००० पेक्षा जास्त वारकऱ्यांना गरम नाश्ता, चहा, शुद्ध पिण्याचे पाणी आणि संध्याकाळी महाप्रसाद वाटप.",
    srv_annadan_btn: "अन्नदानात सहभाग घ्या →",
    srv_medical_title: "२४/७ वैद्यकीय आणि रुग्णवाहिका",
    srv_medical_desc: "डॉक्टरांची टीम, फिरती रुग्णवाहिका, मोफत औषधोपचार आणि पाऊल मालिश केंद्रांची सुविधा.",
    srv_medical_btn: "वैद्यकीय कॅम्प पाहा →",

    // Schedule Timeline
    itinerary_tag: "पालखी प्रवास सूची",
    itinerary_title: "आगामी पालखी मुक्काम आणि सेवा कॅम्प",
    itinerary_subtitle: "वेळापत्रक, मुक्काम मैदान आणि आपत्कालीन संपर्क क्रमांक पाहा.",
    view_full_schedule: "संपूर्ण ११ दिवसांचे वेळापत्रक पाहा →",

    // Seva Callout
    callout_title: "पालखी अन्नदान सेवेला पाठिंबा द्या",
    callout_desc: "तुमची देणगी शिर्डीकडे चालणाऱ्या हजारो वारकऱ्यांना अन्न, पाणी आणि वैद्यकीय मदत पुरवते. सर्व देणग्यांना कलम 80G अंतर्गत ५०% कर सवलत मिळतो.",
    donate_now_btn: "आत्ताच ऑनलाइन देणगी द्या (८०जी पावतीसह)",

    // Donation Page
    donate_tag: "80G करसवलत प्राप्त सेवा योगदान",
    donate_title: "ऑनलाइन सेवा व देणगी पोर्टल",
    donate_subtitle: "महाप्रसाद, वैद्यकीय कॅम्प आणि पालखी सुविधांसाठी तुमचे सहकार्य द्या. सर्व देणग्यांना त्वरित 80G कर सवलत प्रमाणपत्र मिळते.",
    select_preset: "देणगी रक्कम निवडा (₹)",
    custom_amount: "इतर रक्कम (₹) *",
    seva_category: "सेवा प्रकार *",
    donor_name: "देणगीदाराचे पूर्ण नाव *",
    donor_phone: "मोबाईल नंबर *",
    donor_email: "ईमेल पत्ता (पावतीसाठी)",
    donor_pan: "पॅन कार्ड नंबर (२००० रुपयांपेक्षा जास्त देणगीसाठी ८०जी अनिवार्य)",
    pay_notice: "सुरक्षित पेमेंट पद्धत: UPI QR, क्रेडिट/डेबिट कार्ड, नेट बँकिंग आणि Razorpay स्वीकारले जातात.",
    proceed_pay_btn: "💳 पेमेंट करा आणि ८०जी पावती मिळवा",

    // Payment Modal
    modal_title: "ऑनलाइन सेवा देणगी",
    modal_category: "सेवा प्रकार",
    modal_amount: "देय रक्कम",
    tab_upi: "📱 UPI / QR कोड",
    tab_card: "💳 कार्ड पेमेंट",
    tab_netbanking: "🏛️ नेट बँकिंग",
    upi_scan_instruction: "GPay, PhonePe, Paytm किंवा BHIM ॲपद्वारे QR कोड स्कॅन करा:",
    card_name: "कार्डधारकाचे नाव",
    card_number: "कार्ड नंबर",
    card_exp: "वैधता तारीख",
    card_cvv: "CVV",
    select_bank: "बँक निवडा",
    confirm_payment_btn: "पेमेंट पूर्ण करा आणि पावती डाऊनलोड करा",

    // Devotee Pass Page
    pass_title: "अधिकृत वारकरी पास नोंदणी",
    pass_subtitle: "पालखी मुक्काम व शिर्डी दर्शनासाठी तुमचा त्वरित क्यूआर कोड पास मिळवण्यासाठी खालील माहिती भरा.",
    pass_fullname: "वारकऱ्याचे पूर्ण नाव *",
    pass_age: "वय *",
    pass_gender: "लिंग *",
    pass_phone: "मोबाईल नंबर *",
    pass_city: "शहर / मूळ गाव *",
    pass_idtype: "सरकारी ओळखपत्र प्रकार *",
    pass_idnum: "ओळखपत्र क्रमांक *",
    pass_dindigroup: "दिंडी / मंडळाचे नाव",
    pass_submit_btn: "अधिकृत वारकरी पास मिळवा",

    // Footer
    footer_mandal_info: "श्री साई लीला सेवा ट्रस्ट (नोंदणी क्र. ई-३८९२ मुंबई)",
    footer_tagline: "शिर्डी साईबाबांच्या वारकऱ्यांची अन्न, निवारा आणि आरोग्याची निस्वार्थ सेवा.",
    footer_quick_links: "महत्त्वाच्या लिंक्स",
    footer_emergency: "२४/७ आपत्कालीन संपर्क",
    footer_copyright: "© २०२६ श्री साई लीला सेवा ट्रस्ट. सर्व हक्क सुरक्षित."
  }
};

/**
 * Switch Application Language
 * @param {string} lang - 'en' | 'hi' | 'mr'
 */
function setLanguage(lang) {
  if (!translations[lang]) lang = 'mr';
  localStorage.setItem('saileela_lang', lang);

  // Update active state on language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const langData = translations[lang];

  // Replace text for all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = langData[key];
      } else {
        el.innerText = langData[key];
      }
    }
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('saileela_lang') || 'mr';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});
