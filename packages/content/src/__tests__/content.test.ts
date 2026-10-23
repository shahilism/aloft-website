import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  about,
  contactPage,
  enquiryServiceValues,
  faqs,
  home,
  homeServices,
  phonePattern,
  privacyPolicy,
  projectDraftTemplates,
  projectsPage,
  serviceSlugToEnquiry,
  services,
  servicesPage,
  termsOfService,
} from '../index';

test('service slugs are unique and match the content draft URLs', () => {
  const slugs = services.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual(slugs.sort(), [
    'chilled-water-systems',
    'hvac-amc',
    'hvac-design',
    'hvac-ducting',
    'vrf-vrv-systems',
  ]);
});

test('home shows the four revenue-line services in order', () => {
  assert.deepEqual(
    homeServices.map((s) => s.slug),
    ['vrf-vrv-systems', 'hvac-ducting', 'chilled-water-systems', 'hvac-amc'],
  );
});

test('every service has full detail-page content', () => {
  for (const s of services) {
    assert.ok(s.covers.length >= 5, `${s.slug} covers`);
    assert.ok(s.h1.endsWith('.'), `${s.slug} h1`);
    assert.ok(s.cta.length > 0);
    assert.ok(serviceSlugToEnquiry[s.slug], `${s.slug} maps to an enquiry option`);
    assert.ok(enquiryServiceValues.includes(serviceSlugToEnquiry[s.slug]));
  }
});

test('meta descriptions are unique and within search snippet length', () => {
  const metas = [
    home.metaDescription,
    about.metaDescription,
    servicesPage.metaDescription,
    projectsPage.metaDescription,
    contactPage.metaDescription,
    privacyPolicy.metaDescription,
    termsOfService.metaDescription,
    ...services.map((s) => s.metaDescription),
  ];
  assert.equal(new Set(metas).size, metas.length);
  for (const m of metas) assert.ok(m.length >= 50 && m.length <= 170, `length ${m.length}: ${m}`);
});

test('copy follows brand writing rules', () => {
  const copy = JSON.stringify({ home, about, services, faqs, contactPage, projectsPage });
  assert.ok(!copy.includes('!'), 'no exclamation marks');
  assert.ok(!/24\/7/.test(copy), 'no unverified 24/7 claims');
  assert.ok(!/\$\d/.test(copy), 'no US-dollar pricing');
});

test('draft project templates are clearly placeholders', () => {
  for (const p of projectDraftTemplates) {
    assert.match(p.buildingType, /^\[/);
    assert.match(p.location, /^\[/);
  }
});

test('phone pattern accepts Indian formats and rejects junk', () => {
  for (const ok of ['+91 95449 27508', '9544927508', '0483-2731234', '+91 (483) 273 1234']) {
    assert.ok(phonePattern.test(ok), ok);
  }
  for (const bad of ['abc', '12', '+91 95449 27508 ext', '--------']) {
    assert.ok(!phonePattern.test(bad), bad);
  }
});
