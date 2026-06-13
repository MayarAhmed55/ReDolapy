export function isArabicLocale(locale = 'en') {
  return String(locale).startsWith('ar')
}

export function localizeRecycleIdea(idea, locale = 'en') {
  if (!idea) return idea

  const isAr = isArabicLocale(locale)

  return {
    ...idea,
    title: isAr ? (idea.title_ar || idea.title) : idea.title,
    design_description: isAr
      ? (idea.design_description_ar || idea.design_description)
      : idea.design_description,
    description: isAr
      ? (idea.design_description_ar || idea.design_description)
      : idea.design_description,
  }
}

export function localizeRecycleIdeas(ideas = [], locale = 'en') {
  return ideas.map(idea => localizeRecycleIdea(idea, locale))
}

export function localizeGarmentAnalysis(analysis, analysisAr, locale = 'en') {
  return isArabicLocale(locale) ? (analysisAr || analysis) : analysis
}
