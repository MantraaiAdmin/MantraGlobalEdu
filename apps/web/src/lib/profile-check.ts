import { APP_CONFIG } from '@mge/config';

export interface ProfileCheckInput {
  destination: 'US' | 'GB' | 'AU';
  degreeLevel: 'BACHELORS' | 'MASTERS';
  academicScore: number;
  englishScore?: number;
  budget: number;
  workExperience?: number;
  field: string;
}

export interface ProfileCheckResult {
  score: number;
  readiness: 'Strong' | 'Good' | 'Developing';
  summary: string;
  recommendations: string[];
  suggestedCountries: string[];
}

export function evaluateProfile(input: ProfileCheckInput): ProfileCheckResult {
  let score = 50;
  const recommendations: string[] = [];

  if (input.academicScore >= 85) score += 15;
  else if (input.academicScore >= 75) score += 10;
  else if (input.academicScore >= 65) score += 5;
  else recommendations.push('Consider strengthening academics or targeting universities with flexible entry requirements.');

  if (input.englishScore) {
    if (input.englishScore >= 7.0) score += 15;
    else if (input.englishScore >= 6.5) score += 10;
    else if (input.englishScore >= 6.0) score += 5;
    else recommendations.push('Plan IELTS/PTE preparation — most programs require 6.5+ overall.');
  } else {
    recommendations.push('Take an English proficiency test (IELTS/PTE) early in your timeline.');
  }

  const budgetThresholds: Record<string, number> = {
    US: 35000,
    GB: 28000,
    AU: 30000,
  };
  const threshold = budgetThresholds[input.destination] || 30000;
  if (input.budget >= threshold) score += 15;
  else if (input.budget >= threshold * 0.7) score += 8;
  else recommendations.push(`Explore scholarships and education loan options with ${APP_CONFIG.shortName} counselors.`);

  if (input.degreeLevel === 'MASTERS' && (input.workExperience ?? 0) >= 1) score += 10;

  score = Math.min(98, Math.max(35, score));

  const readiness = score >= 80 ? 'Strong' : score >= 65 ? 'Good' : 'Developing';

  const countryNames: Record<string, string> = {
    US: 'USA',
    GB: 'United Kingdom',
    AU: 'Australia',
  };

  const summary =
    readiness === 'Strong'
      ? `Your profile shows strong readiness for ${countryNames[input.destination]} ${input.degreeLevel === 'MASTERS' ? 'postgraduate' : 'undergraduate'} programs in ${input.field}.`
      : readiness === 'Good'
        ? `You have a solid foundation for ${countryNames[input.destination]}. A few improvements could strengthen your applications.`
        : `You're at the start of a great journey. ${APP_CONFIG.shortName} counselors can help build a realistic plan for ${countryNames[input.destination]}.`;

  if (recommendations.length === 0) {
    recommendations.push('Book a free counseling session to get a personalised university shortlist.');
    recommendations.push(`Explore scholarships matched to your profile on ${APP_CONFIG.shortName}.`);
  }

  return {
    score,
    readiness,
    summary,
    recommendations,
    suggestedCountries: [input.destination],
  };
}
