✅ 3.1 – Normalization Exercise
Which columns violate 1NF?

1NF requires:

No repeating groups

No multivalued attributes

Atomic values

Violations:

food_code → contains multiple codes (e.g., C1, C2)

food_description → contains multiple values (e.g., Curry, Cake)

dinner_date → inconsistent date formats (not strictly 1NF violation, but bad practice)

2. Extracted Entities

Member

Dinner

Venue

Food

Member–Dinner (many-to-many)

Dinner–Food (many-to-many)

3. 3NF Tables
Member

member_id (PK)

member_name

member_address

Venue

venue_code (PK)

venue_description

Dinner

dinner_id (PK)

dinner_date

venue_code (FK → Venue)

Food

food_code (PK)

food_description

MemberDinner

member_id (FK)

dinner_id (FK)
PK: (member_id, dinner_id)

DinnerFood

dinner_id (FK)

food_code (FK)
PK: (dinner_id, food_code)