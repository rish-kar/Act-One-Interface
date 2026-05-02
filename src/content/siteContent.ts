export type NavItem = { label: string; href: string }

export type ShowListCard = {
  id: string
  title: string
  description: string
  dateText: string
  venueText: string
  priceText: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

export type FullShow = {
  id: string
  title: string
  tagline: string
  language: string
  genre: string
  durationMins: string
  ageRating: string
  priceInr: string
  venue: { name: string; city: string; address: string }
  schedule: Array<{ date: string; time: string }>
  synopsis: {
    hook: string
    full: string
    themes: string[]
    contentWarnings: string[]
  }
  credits: Record<string, string>
  cast: Array<{ actor: string; role: string }>
  media: {
    poster: string
    trailerUrl: string
    gallery: string[]
  }
}

export type SiteContent = {
  brand: { name: string; shortName: string; tagline: string; logoAlt: string }
  navigation: { items: NavItem[] }
  homePage: {
    hero: {
      eyebrow: string
      headline: string
      subcopy: string
      ctaPrimary: { label: string; href: string }
      ctaSecondary: { label: string; href: string }
      centerMedia: {
        type: 'videoWithFallback'
        videoPath: string
        fallbackImagePath: string
        caption: string
      }
    }
    quickStatsCards: Array<{ value: string; label: string; note: string }>
    aboutOurCraftPanel: {
      title: string
      columns: Array<{ title: string; text: string }>
    }
    bannerPanel: {
      leftTitle: string
      leftText: string
      rightCta: { label: string; href: string }
    }
    upcomingShowsSection: {
      title: string
      rightLink: { label: string; href: string }
      showCards: ShowListCard[]
    }
    pressAndReviewsSection: {
      title: string
      items: Array<{
        id: string
        headline: string
        reviewer: string
        location: string
        eventDateText: string
        venue: string
        summary: string
        highlightsBullets: string[]
        link: { label: string; href: string }
      }>
    }
  }
  showsPage: {
    pageTitle: string
    pageIntro: string
    filters: { city: string; language: string; dateRange: string }
    shows: FullShow[]
  }
  bookingPage: {
    pageTitle: string
    intro: string
    form: {
      submit: { label: string; apiEndpoint: string }
      successState: { title: string; message: string; nextCta: { label: string; href: string } }
      errorState: { title: string; message: string }
    }
  }
  contactPage: {
    pageTitle: string
    intro: string
    contactDetails: {
      address: string
      city: string
      email: string
      phone: string
      phone2: string
      phone3: string
      whatsapp: string
      mapEmbedUrl: string
    }
    social: Array<{ label: string; href: string }>
  }
  footer: {
    left: { title: string; text: string }
    contact: { address: string; email: string; phone: string }
    social: Array<{ label: string; href: string }>
    copyright: string
    credits?: {
      developer?: string
      music?: string
    }
  }
  pastProductions: {
    title: string
    items: Array<{
      eventTitle: string
      dateText: string
      venue: string
      directorDesigner: string
      plays: Array<{
        title: string
        theme: string
        playwright: string
        reviewHighlights: string[]
      }>
      productionCreditsMentioned: Record<string, string>
    }>
  }
}

export const siteContent: SiteContent = {
  brand: {
    name: 'Prarambh Theatre Group',
    shortName: 'Prarambh',
    tagline: 'Stories that breathe on stage.',
    logoAlt: 'Prarambh Theatre Group logo',
  },
  navigation: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Book Seats', href: '/shows' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Workshops', href: '/gallery/workshops' },
      { label: 'Social Work', href: '/gallery/social-work' },
      { label: 'Members', href: '/members' },
      { label: 'Previous shows', href: '/previous-shows' },
      { label: 'Support Us', href: '/support-us' },
      { label: 'Feedback', href: '/feedback' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  homePage: {
    hero: {
      eyebrow: '',
      headline: 'Prarambh Theatre\nA journey where stories begin, voices rise, and society reflects.',
      subcopy:
        'Prarambh is a socio-cultural theatre collective and public charitable trust devoted to meaningful storytelling.\nWe create theatre that engages with social realities—women’s rights, child welfare, environment, and community consciousness—through powerful performances and dialogue-driven drama.',
      ctaPrimary: { label: '', href: '/' },
      ctaSecondary: { label: '', href: '/' },
      centerMedia: {
        type: 'videoWithFallback',
        videoPath: 'public/media/logo.webm',
        fallbackImagePath: 'public/media/logo.webp',
        caption: 'STORIES THAT BREATHE ON STAGE.',
      },
    },
    quickStatsCards: [],
    aboutOurCraftPanel: {
      title: 'In three acts',
      columns: [
        {
          title: 'Our Vision',
          text: 'We believe theatre is a mirror to society and a catalyst for change. Prarambh stages stories that question norms, amplify unheard voices, and provoke thought—without spectacle, but with sincerity and depth.',
        },
        {
          title: 'Our Practice',
          text: 'Rooted in disciplined rehearsal, collective learning, and respect for classical and contemporary forms, our theatre prioritises story, performance, and emotional truth over scale or spectacle.',
        },
        {
          title: 'Our Community',
          text: 'Prarambh is a growing family of actors, writers, thinkers, and audiences. Through performances, workshops, readings, and collaborations, we nurture dialogue and belonging within and beyond the stage.',
        },
      ],
    },
    bannerPanel: {
      leftTitle: 'Support & Feedback',
      leftText: 'Help us keep rehearsal rooms alive—and tell us what stayed with you after the curtain call.',
      rightCta: { label: 'Support Us', href: '/support-us' },
    },
    upcomingShowsSection: {
      title: 'Upcoming shows',
      rightLink: { label: 'View schedule', href: '/shows' },
      showCards: [
        {
          id: 'show-1',
          title: 'Chorabali & Gobhir Asukh',
          description:
            'A socially conscious double bill — two one-act Bengali plays presented as a single premium theatre night.',
          dateText: 'Sunday, 8th February 2026 · 6:00 PM',
          venueText: 'Muktadhara Auditorium, Gole Market, New Delhi',
          priceText: '₹ 250 · 2 Hours 30 Mins',
          ctaPrimary: { label: 'Book Seats', href: '/book?showId=show-1' },
          ctaSecondary: { label: 'View all', href: '/shows' },
        },
      ],
    },
    pressAndReviewsSection: {
      title: 'Press & Reviews',
      items: [
        {
          id: 'review-2024-12-08-delhi',
          headline: 'Prarambh presented two one-act Bengali plays—socially conscious and impactful',
          reviewer: 'Dilip Guha',
          location: 'New Delhi',
          eventDateText: 'Sunday, 8 December 2024',
          venue: 'Muktadhara Auditorium, Gole Market, New Delhi 110001',
          summary:
            'A socially conscious double bill aligned with a “No War” initiative; strong performances and effective music/lights/costumes; overall a pleasant experience, with a note that the set for one play could be more imaginative.',
          highlightsBullets: [
            'Themes: anti-war, justice vs cost, empathy for women’s losses, critique of exploitation',
            'Production praised: music, lights, costume & makeup',
            'Performance highlights mentioned for lead roles and key characters',
          ],
          link: {
            label: 'Read more',
            href: 'https://www.newswaveindia.com/english/prarambh-theatre-group-staged-two-plays-of-two-different-genres/',
          },
        },
        {
          id: 'press-2022-world-theatre-day',
          headline: 'World Theatre Day celebrated with a vibrant range of Bengali plays',
          reviewer: 'The Statesman',
          location: 'New Delhi',
          eventDateText: 'World Theatre Day',
          venue: 'New Delhi',
          summary:
            'World Theatre Day in Delhi witnessed a rich presentation of Bengali plays spanning diverse themes and genres. Multiple groups showcased the evolving language of contemporary Bengali theatre, balancing socially relevant narratives with creative experimentation to reaffirm theatre’s role as a cultural and intellectual space.',
          highlightsBullets: [
            'Themes: social awareness, human relationships, cultural reflection',
            'Production praised: variety of genres, narrative depth, ensemble performances',
            'Overall note: a meaningful celebration of theatre as a living art form',
          ],
          link: {
            label: 'Read more',
            href: 'https://www.thestatesman.com/entertainment/theatre/world-theatre-day-saw-bunch-bengali-plays-variety-genres-1503060429.html',
          },
        },
        {
          id: 'press-chup-adalat-cholchey',
          headline: 'Prarambh’s “Chup, Adalat Cholchey” puts gender bias on trial',
          reviewer: 'News Wave India',
          location: 'New Delhi',
          eventDateText: '',
          venue: 'New Delhi',
          summary:
            'A sharp, courtroom-style narrative confronting patriarchal attitudes and social prejudice. The production uses confrontation and irony to challenge norms, reinforcing Prarambh’s commitment to socially conscious storytelling.',
          highlightsBullets: [
            'Themes: gender bias, patriarchy, social justice',
            'Production praised: powerful performances, strong message, focused direction',
            'Overall note: theatre used as a platform for questioning social norms',
          ],
          link: {
            label: 'Read more',
            href: 'https://www.newswaveindia.com/english/prarambhs-chup-adalat-cholchey-tackling-gender-bias-on-stage/',
          },
        },
        {
          id: 'press-2025-04-18-aayesha',
          headline: 'Prarambh presented a non-verbal environmental play—engaging and visually striking',
          reviewer: 'Dilip Guha',
          location: 'New Delhi',
          eventDateText: 'Friday, 18 April 2025',
          venue: 'Muktadhara Auditorium, Gole Market, New Delhi 110001',
          summary:
            'A colourful theatre festival marked World Theatre Day with multiple microplays and a diverse range of performances; Prarambh’s non-verbal production Aayesha captivated especially young viewers with its environmental narrative and strong visual effects, while other entries added variety and social depth to the day’s lineup.',
          highlightsBullets: [
            'Themes: environmental awareness, women’s identity, social struggles, empowerment, childhood theatre, education issues, exile and freedom',
            'Production praised: mask work, lighting, props, stage design, ensemble presentations',
            'Performance highlights mentioned for Prarambh’s Aayesha, Spotlight’s Alor Pothe, Navapalli Natya’s E ki Nirbasan, Ichchhe-Bitan children’s Bidushak',
          ],
          link: {
            label: 'Read more',
            href: 'https://sasrayanews.in/world-theatre-day-celebrated-with-grandeur-in-delhi/',
          },
        },
      ],
    },
  },
  showsPage: {
    pageTitle: 'Shows',
    pageIntro: 'Explore upcoming performances and book your seats.',
    filters: { city: '[TBD]', language: '[TBD]', dateRange: '[TBD]' },
    shows: [
      {
        id: 'show-1',
        title: 'Chorabali & Gobhir Asukh',
        tagline: 'Two One-Act Plays',
        language: 'Bengali',
        genre: '[TBD]',
        durationMins: '[TBD]',
        ageRating: '[TBD]',
        priceInr: '[TBD]',
        venue: { name: '[TBD]', city: '[TBD]', address: '[TBD]' },
        schedule: [{ date: '[TBD]', time: '[TBD]' }],
        synopsis: {
          hook: '[TBD]',
          full: '[TBD: 150–250 words]',
          themes: ['[TBD]', '[TBD]', '[TBD]'],
          contentWarnings: ['[Optional TBD]'],
        },
        credits: {
          director: 'Rabi Shankar Kar',
          'assistant director': 'Priyadarshi Banerjee',
          writer: 'Sh. Shivankar Chakraborty',
          music: '[TBD]',
          lights: '[TBD]',
          setProps: '[TBD]',
          costumeMakeup: 'Soma Kar',
        },
        cast: [{ actor: '[TBD]', role: '[TBD]' }],
        media: { poster: '[TBD path/url]', trailerUrl: '[TBD]', gallery: ['[TBD]'] },
      },
    ],
  },
  bookingPage: {
    pageTitle: 'Book Seats',
    intro: 'Share your details, proceed to payment, then enter your transaction ID to confirm your seats to get E-Invitation.',
    form: {
      submit: { label: 'Payment', apiEndpoint: '/api/tickets/issue' },
      successState: {
        title: 'Booking confirmed',
        message: 'Your ticket has been issued. Please check your email for the e-invite and QR code.',
        nextCta: { label: 'Go to Home', href: '/' },
      },
      errorState: { title: 'Could not complete booking', message: '[Display API error here]' },
    },
  },
  contactPage: {
    pageTitle: 'Contact',
    intro: 'Reach out for bookings, collaborations, workshops, and press.',
    contactDetails: {
      address: 'Gaur City 1, Avenue 1, Greater Noida West',
      city: '',
      email: 'prarambh.theatre.group@gmail.com',
      phone: '+91-9310109669',
      phone2: '+91-9818469935',
      phone3: '+91-9818620738',
      whatsapp: '[Optional TBD]',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5648848634232!2d77.42426929999999!3d28.6128274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef8952803847%3A0xeb592bc2ab8236fb!2s1st%20Avenue%2C%20GC1!5e0!3m2!1sen!2sin!4v1767012123516!5m2!1sen!2sin',
    },
    social: [
      { label: 'Instagram', href: '[TBD]' },
      { label: 'Facebook', href: 'https://www.facebook.com/prarambh.natya/' },
    ],
  },
  footer: {
    left: {
      title: 'Prarambh Theatre Group',
      text: 'Stories that breathe on stage. Contemporary performance, community workshops, and rehearsal-room craft—built with care.',
    },
    contact: {
      address: 'Gaur City 1, Avenue 1, Gautam Buddha Nagar, Greater Noida West, Uttar Pradesh - 201318',
      email: 'prarambh.theatre.group@gmail.com',
      phone: '+91-9310109669',
    },
    social: [
      { label: 'Instagram', href: '[TBD]' },
      { label: 'GitHub', href: '[Optional TBD]' },
    ],
    copyright: '© [YEAR] Prarambh Theatre Group',
    credits: {
      developer: 'Designed and Developed by Rishabh Kar',
      music: 'Background music by Scott Buckley',
    },
  },
  pastProductions: {
    title: 'Past productions',
    items: [
      {
        eventTitle: 'Two one-act Bengali plays (double bill)',
        dateText: 'Sunday, 8 December 2024',
        venue: 'Muktadhara Auditorium, Gole Market, New Delhi 110001',
        directorDesigner: 'Rabishankar Kar',
        plays: [
          {
            title: 'Uttara',
            theme: 'Anti-war; aftermath of Abhimanyu’s death',
            playwright: 'Dr. Sisir Kumar Das',
            reviewHighlights: [
              'Explores grief and moral dilemmas of war through women’s perspectives',
              'Audience invited to question whether the war’s goals justify its cost',
              'Note: set could be more imaginative',
            ],
          },
          {
            title: 'Restaurant',
            theme: 'Anti-exploitation of the poor; class hypocrisy',
            playwright: 'Zulfiqquar Zinna',
            reviewHighlights: [
              'Contrasts elite luxury with worker hardship',
              'Critiques moral decay and exploitation',
            ],
          },
        ],
        productionCreditsMentioned: {
          music: 'Shantanu Ganguli',
          lights: 'Shubhodev Banerjee',
          costumeMakeup: 'Soma Kar',
        },
      },
    ],
  },
}