import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      tryOn: 'Try-On',
      recycle: 'Recycle',
      pricing: 'Pricing',
      about: 'About',
      login: 'Login',
      signup: 'Sign up'
    },
    header: {
      primaryText: 'Your Personal',
      gradientText: 'AI Stylist',
      description: 'Get outfit recommendations, virtual try-ons, and wardrobe insights tailored to your style. smart.fast.effortless.',
      cta: 'Start Styling'
    },
    features: {
      sectionTitle: 'Fashion Intelligence',
      sectionDescription: 'Built for the next generation of style enthusiasts.',
      aiRecommendations: {
        title: 'AI Recommendations',
        description: 'Proprietary algorithms that learn your aesthetic and suggest outfits that actually match your personality.'
      },
      tryOn: {
        title: 'Try-on',
        description: 'Precise body mapping technology ensures you never have to guess your size across different brands again.'
      },
      recycle: {
        title: 'Recycle',
        description: 'Stay ahead of the curve with real-time analysis of global runway trends filtered through your style lens.'
      }
    },
    steps: {
      title: 'Simple, Smart, Seamless',
      uploadSync: {
        stepNumber: '1',
        title: 'Upload & Sync',
        description: 'Upload photos of your current wardrobe or sync with your favorite shopping apps.'
      },
      neuralAnalysis: {
        stepNumber: '2',
        title: 'Neural Analysis',
        description: 'Our AI analyzes color palettes, textures, and silhouettes to build your digital DNA.'
      },
      curatedStyling: {
        stepNumber: '3',
        title: 'Curated Styling',
        description: 'Receive personalized daily lookbooks and shopping suggestions that fit your style.'
      }
    },
    sustainable: {
      title: 'Sustainable Wardrobe',
      description: 'AELIA is committed to circular fashion. Our platform doesn\'t just help you style your clothes—it helps you manage their entire lifecycle. Join our movement to reduce textile waste through smart recycling, reselling, and donation programs.',
      recycleRenew: 'Recycle & Renew',
      recycleDescription: 'Easily request a recycling kit for items that have reached the end of their life.',
      learnRecycling: 'Learn about Recycling',
      learnTryOn: 'Learn about Try On'
    },
    tryOnSection: {
      yourMirror: 'Your Mirror',
      reimagined: 'Re Imagined.',
      description: 'The Redolapy Virtual Try-On uses hyper-realistic rendering to show you exactly how clothes will look and drape on your body.',
      button: 'Try On'
    },
    pricing: {
      title: 'ReDolapy Pricing',
      subtitle: 'Choose the plan that fits your fashion journey.',
      free: {
        name: 'Free Plan',
        price: '$0',
        priceUnit: '/month',
        features: [
          'AI Wardrobe Sync',
          'Daily Look books (3 outfits)',
          'Basic Virtual Try-On'
        ],
        button: 'Get Started'
      },
      pro: {
        name: 'Pro Plan',
        price: '$20',
        priceUnit: '/month',
        features: [
          'Everything in Essential',
          'Hyper-Realistic Try-On',
          'Unlimited Look books',
          'Personal Style Coaching'
        ],
        button: 'Start Free Trial'
      },
      monthly: 'Monthly Subscription',
      monthlyPrice: '$19.99',
      earlyBirdDiscount: 'Early Bird Discount',
      discountAmount: '-$5.00',
      estimatedTax: 'Estimated Tax',
      taxAmount: '$1.20',
      subscribe: 'Subscribe to pro',
      dueToday: 'Due today',
      dueTodayValue: '$16.20',
      terms: 'By subscribing, you agree to Redolapy\'s Terms of Service and Privacy Policy.'
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          title: 'How does the AI know my size?',
          answer: 'Our advanced AI analyzer maps your physical body geometry measurements using standard metrics or a quick photo scan to cross-reference fit scales across global retail brands seamlessly.'
        },
        {
          title: 'Can I use Redolapy with my current clothes?',
          answer: 'Yes! You can take photos of your existing wardrobe pieces, and our digital closet system will instantly catalog them and generate fresh style lookbooks combined with new styling recommendations.'
        }
      ]
    },
    aboutRecycle: {
      header_primary: 'Why Upcycling Matters',
      header_gradient: 'Reuse with Style',
      header_description: 'Small changes today, big impact tomorrow. Learn how Redolapy turns unused items into fresh wardrobe pieces through creative recycling.',
      header_cta: 'Learn More',
      btn_see_how_to_recycle: 'See how to recycle',
      title: 'Why Upcycling Matters',
      subtitle: 'Small changes today, big impact tomorrow.',
      cards_section_description: 'Discover the environmental and financial benefits of upcycling your wardrobe items.',
      how_it_works_title: 'How it works',
      how_it_works_description: 'Upload, get AI suggestions, and see how your old pieces become new fashion.',
      saveWater: {
        title: 'Save Water',
        description: 'Upcycling uses significantly less water'
      },
      saveMoney: {
        title: 'Save Money',
        description: 'Refresh your personal style and get'
      },
      reduceWaste: {
        title: 'Reduce Waste',
        description: 'Keep clothing out of landfills and'
      },
      examples: {
        title: 'See What AI Can Create',
        subtitle: 'From old to new — endless creative possibilities.',
        denimBag: 'Denim Tote Bag',
        oldJeans: 'Old Jeans'
      },
      example1_description: 'Turn old denim into a stylish tote or accessory piece.',
      example2_description: 'Transform worn denim into new, wearable fashion.',
      example3_title: 'White Shirt',
      example3_description: 'Give your favorite shirts a fresh second life.',
      uploadProcess: {
        title: 'Upload Your Clothing',
        description: 'Take photos of items you no longer wear or use and add them to your digital atelier.'
      },
      aiSuggests: {
        title: 'AI Suggests Ideas',
        description: 'Our AI analyzes your items and generates creative upcycling ideas tailored to your style.'
      },
      transformReuse: {
        title: 'Transform & Reuse',
        description: 'Bring your new design to life or connect with creators in our curated marketplace.'
      }
    },
    upload: {
      piece: 'Piece',
      analyzing: 'Creating your design ideas…',
      discover: 'Discover Design Ideas'
    },
    footer: {
      brandName: 'ReDolapy',
      tagline: 'Elevating digital ateliers through artificial intelligence and human creativity.',
      platform: 'Platform',
      styleGuide: 'Style Guide',
      tryOn: 'Try On',
      features: 'Features',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy'
    },
    payment: {
      completeSubscription: 'Complete Subscription',
      paymentMethod: 'Payment Method',
      cardNumber: 'Card Number',
      dateFormat: 'MM/YY',
      cvv: 'CVV',
      savePayment: 'Save payment details for future use'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      features: 'المميزات',
      tryOn: 'جرب الآن',
      recycle: 'إعادة التدوير',
      pricing: 'الأسعار',
      about: 'حول',
      login: 'دخول',
      signup: 'إنشاء حساب'
    },
    header: {
      primaryText: 'مستشارك الشخصي',
      gradientText: 'بالذكاء الاصطناعي',
      description: 'احصل على توصيات الملابس والتجارب الافتراضية ورؤى خزانة ملابسك المخصصة. ذكي.سريع.بسيط.',
      cta: 'ابدأ الآن'
    },
    features: {
      sectionTitle: 'الذكاء الاصطناعي في الموضة',
      sectionDescription: 'مصمم لجيل جديد من محبي الأسلوب.',
      aiRecommendations: {
        title: 'التوصيات بالذكاء الاصطناعي',
        description: 'خوارزميات متطورة تتعلم ذوقك الشخصي وتقترح عليك ملابس تناسب شخصيتك تماماً.'
      },
      tryOn: {
        title: 'جرب الملابس افتراضياً',
        description: 'تقنية المسح الجسدي الدقيقة تضمن أنك لن تخمن مقاسك مرة أخرى عبر العلامات التجارية المختلفة.'
      },
      recycle: {
        title: 'إعادة تدوير مستدامة',
        description: 'ابقَ متطوراً مع تحليل اتجاهات المدرج العالمية المرشحة من خلال عدسة أسلوبك.'
      }
    },
    steps: {
      title: 'بسيط، ذكي، سلس',
      uploadSync: {
        stepNumber: '1',
        title: 'رفع المنتجات ومزامنتها',
        description: 'قم برفع صور ملابسك الحالية أو قم بالمزامنة مع تطبيقات التسوق المفضلة لديك.'
      },
      neuralAnalysis: {
        stepNumber: '2',
        title: 'التحليل الذكي',
        description: 'يحلل الذكاء الاصطناعي الألوان والقوام والقصات لبناء ملفك الشخصي الرقمي.'
      },
      curatedStyling: {
        stepNumber: '3',
        title: 'التصميم المختار',
        description: 'احصل على اقتراحات أسلوب شخصية يومية وتوصيات للتسوق التي تناسب ذوقك.'
      }
    },
    sustainable: {
      title: 'خزانة ملابس مستدامة',
      description: 'نحن ملتزمون بالموضة الدائرية. منصتنا لا تساعدك فقط على تنسيق ملابسك، بل تساعدك على إدارة دورة حياتها بالكامل. انضم إلى حركتنا لتقليل نفايات النسيج من خلال إعادة التدوير والبيع والتبرع الذكي.',
      recycleRenew: 'إعادة تدوير وتجديد',
      recycleDescription: 'قدّم طلب بسهولة لصندوق إعادة تدوير للملابس التي انتهت صلاحيتها.',
      learnRecycling: 'تعرّف على إعادة التدوير',
      learnTryOn: 'تعرّف على الجرب الافتراضي'
    },
    tryOnSection: {
      yourMirror: 'مرآتك الشخصية',
      reimagined: 'معاد تخيلها.',
      description: 'تقنية الجرب الافتراضي من ريدولابي تستخدم عرضاً واقعياً فائق الدقة لتوضيح كيفية ملاءمة الملابس لجسدك تماماً.',
      button: 'جرب الآن'
    },
    pricing: {
      title: 'أسعار ريدولابي',
      subtitle: 'اختر الخطة التي تناسب رحلتك في الموضة.',
      free: {
        name: 'خطة مجانية',
        price: '$0',
        priceUnit: '/شهري',
        features: [
          'مزامنة خزانة ملابسك بالذكاء الاصطناعي',
          'كتب الإطلالات اليومية (3 إطلالات)',
          'تجربة افتراضية أساسية'
        ],
        button: 'ابدأ الآن'
      },
      pro: {
        name: 'خطة احترافية',
        price: '$20',
        priceUnit: '/شهري',
        features: [
          'كل ما في الخطة الأساسية',
          'تجربة افتراضية واقعية فائقة',
          'كتب إطلالات غير محدودة',
          'خدمة تدريب الأسلوب الشخصي'
        ],
        button: 'ابدأ التجربة المجانية'
      },
      monthly: 'الاشتراك الشهري',
      monthlyPrice: '$19.99',
      earlyBirdDiscount: 'خصم المبكرين',
      discountAmount: '-$5.00',
      estimatedTax: 'الضريبة المتوقعة',
      taxAmount: '$1.20',
      subscribe: 'الاشتراك في الخطة الاحترافية',
      dueToday: 'المستحق اليوم',
      dueTodayValue: '$16.20',
      terms: 'بالاشتراك، أنت توافق على شروط الخدمة وسياسة الخصوصية لريدولابي.'
    },
    faq: {
      title: 'الأسئلة الشائعة',
      questions: [
        {
          title: 'كيف يعرف الذكاء الاصطناعي مقاسي؟',
          answer: 'يحلل نظام الذكاء الاصطناعي المتقدم قياسات جسمك باستخدام معايير موحدة أو مسح صورة سريع للمقارنة مع جداول المقاسات العالمية عبر العلامات التجارية المختلفة بسلاسة.'
        },
        {
          title: 'هل يمكنني استخدام ريدولابي مع ملابسي الحالية؟',
          answer: 'نعم! يمكنك التقاط صور قطع الملابس الموجودة لديك، وسيقوم نظامنا بفهرستها فوراً وإنشاء كتب إطلالات جديدة وتوصيات أسلوب مخصصة لك.'
        }
      ]
    },
    aboutRecycle: {
      header_primary: 'لماذا إعادة التدوير مهمة؟',
      header_gradient: 'أعد الاستخدام بأناقة',
      header_description: 'تغييرات صغيرة اليوم يمكن أن تترك تأثيراً كبيراً غداً. اكتشف كيف يحول ريدولابي العناصر غير المستخدمة إلى قطع جديدة في خزانة ملابسك عبر إعادة التدوير الإبداعية.',
      header_cta: 'اعرف أكثر',
      btn_see_how_to_recycle: 'شاهد كيف تعيد التدوير',
      title: 'لماذا إعادة التدوير مهمة؟',
      subtitle: 'تغييرات صغيرة اليوم، تأثير كبير غداً.',
      cards_section_description: 'اكتشف الفوائد البيئية والمالية لإعادة تدوير قطع ملابسك.',
      how_it_works_title: 'كيف تعمل',
      how_it_works_description: 'ارفَع، احصل على اقتراحات الذكاء الاصطناعي، وشاهد كيف تتحول قطعك القديمة إلى موضة جديدة.',
      saveWater: {
        title: 'توفير المياه',
        description: 'تستخدم إعادة التدوير مياهاً أقل بكثير'
      },
      saveMoney: {
        title: 'توفير المال',
        description: 'جدد أسلوبك الشخصي واحصل على'
      },
      reduceWaste: {
        title: 'تقليل النفايات',
        description: 'أبقِ الملابس بعيداً عن مدافن النفايات و'
      },
      examples: {
        title: 'شاهد ما يمكن للذكاء الاصطناعي أن ينشئه',
        subtitle: 'من القديم إلى الجديد — إمكانيات إبداعية لا نهاية لها.',
        denimBag: 'حقيبة الجينز',
        oldJeans: 'جينز قديم'
      },
      example1_description: 'حَوِّل الدنيم القديم إلى حقيبة أنيقة أو قطعة إكسسوار.',
      example2_description: 'حوّل الجينز المهترئ إلى أزياء جديدة قابلة للارتداء.',
      example3_title: 'قميص أبيض',
      example3_description: 'امنح قمصانك المفضلة حياة ثانية جديدة.',
      uploadProcess: {
        title: 'رفع ملابسك',
        description: 'التقط صور الملابس التي لا ترتديها أو تستخدميها وأضفها إلى أتيليه ريدولابي الرقمي.'
      },
      aiSuggests: {
        title: 'الذكاء الاصطناعي يقترح أفكاراً',
        description: 'يحلل النظام ملابسك ويولد أفكاراً إبداعية مخصصة لإعادة التدوير تناسب أسلوبك.'
      },
      transformReuse: {
        title: 'حول وأعد الاستخدام',
        description: 'جسّد تصميمك الجديد أو تواصل مع المبدعين في سوقنا المنسقة.'
      }
    },
    upload: {
      piece: 'القطعة',
      analyzing: 'جاري إنشاء أفكار التصميم...',
      discover: 'اكتشف أفكار التصميم'
    },
    footer: {
      brandName: 'ريدولابي',
      tagline: 'نرفع مستوى الأتيليهات الرقمية من خلال الذكاء الاصطناعي والإبداع البشري.',
      platform: 'المنصة',
      styleGuide: 'دليل الأسلوب',
      tryOn: 'الجرب الافتراضي',
      features: 'المميزات',
      legal: 'قانوني',
      privacyPolicy: 'سياسة الخصوصية'
    },
    payment: {
      completeSubscription: 'إكمال الاشتراك',
      paymentMethod: 'طريقة الدفع',
      cardNumber: 'رقم البطاقة',
      dateFormat: 'ش/س',
      cvv: 'رمز CVV',
      savePayment: 'احفظ بيانات الدفع لاستخدام مستقبلي'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n