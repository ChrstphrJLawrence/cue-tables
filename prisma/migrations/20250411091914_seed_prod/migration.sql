INSERT INTO User VALUES('cm9cj99o30000aow03581bpgd','ChrstphrJLawrence@gmail.com','Christopher','Christopher Lawrence',1744360590387,1744360590387);

INSERT INTO UserImage VALUES('cm9cj99od0003aow0luebgss9',NULL,'user/kody.png',1744360590398,1744360590398,'cm9cj99o30000aow03581bpgd');

INSERT INTO Password VALUES('$2b$10$8ZQqDuhJX0PgC08HYGgh/eEp2xwTjt2R.IjO2nd5qMtfEN.ZN1Beu','cm9cj99o30000aow03581bpgd');

INSERT INTO Permission (id, action, entity, access, description, createdAt, updatedAt)
VALUES 
  ('clnf2zvli0000pcou3zzzzome','create','user','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvll0001pcouly1310ku','create','user','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvll0002pcouka7348re','read','user','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlm0003pcouea4dee51','read','user','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlm0004pcou2guvolx5','update','user','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvln0005pcoun78ps5ap','update','user','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlo0006pcouyoptc5jp','delete','user','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlo0007pcouw1yzoyam','delete','user','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlp0008pcou9r0fhbm8','create','note','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlp0009pcouj3qib9q9','create','note','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlq000apcouxnspejs9','read','note','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlr000bpcouf4cg3x72','read','note','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlr000cpcouy1vp6oeg','update','note','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvls000dpcouvzwjjzrq','update','note','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvls000epcou4ts5ui8f','delete','note','own','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlt000fpcouk29jbmxn','delete','note','any','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT(action, entity, access) DO NOTHING;

INSERT INTO Role (id, name, description, createdAt, updatedAt)
VALUES 
  ('clnf2zvlw000gpcour6dyyuh6','admin','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
  ('clnf2zvlx000hpcou5dfrbegs','user','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT(name) DO NOTHING;

INSERT INTO Connection VALUES('cm9cj99o30001aow0i88yvqms','github','6483432875906615',1744360590387,1744360590387,'cm9cj99o30000aow03581bpgd');

INSERT INTO _PermissionToRole (A, B)
VALUES
  ('clnf2zvll0001pcouly1310ku','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvlm0003pcouea4dee51','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvln0005pcoun78ps5ap','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvlo0007pcouw1yzoyam','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvlp0009pcouj3qib9q9','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvlr000bpcouf4cg3x72','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvls000dpcouvzwjjzrq','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvlt000fpcouk29jbmxn','clnf2zvlw000gpcour6dyyuh6'),
  ('clnf2zvli0000pcou3zzzzome','clnf2zvlx000hpcou5dfrbegs'),
  ('clnf2zvll0002pcouka7348re','clnf2zvlx000hpcou5dfrbegs'),
  ('clnf2zvlm0004pcou2guvolx5','clnf2zvlx000hpcou5dfrbegs'),
  ('clnf2zvlo0006pcouyoptc5jp','clnf2zvlx000hpcou5dfrbegs'),
  ('clnf2zvlp0008pcou9r0fhbm8','clnf2zvlx000hpcou5dfrbegs'),
  ('clnf2zvlq000apcouxnspejs9','clnf2zvlx000hpcou5dfrbegs'),
  ('clnf2zvlr000cpcouy1vp6oeg','clnf2zvlx000hpcou5dfrbegs'),
  ('clnf2zvls000epcou4ts5ui8f','clnf2zvlx000hpcou5dfrbegs')
ON CONFLICT(A, B) DO NOTHING;

INSERT INTO _RoleToUser (A, B)
VALUES
  ('clnf2zvlw000gpcour6dyyuh6','cm9cj99o30000aow03581bpgd'),
  ('clnf2zvlx000hpcou5dfrbegs','cm9cj99o30000aow03581bpgd')
ON CONFLICT(A, B) DO NOTHING;

INSERT INTO "Table" VALUES(1,'Table 1',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT INTO "Table" VALUES(2,'Table 2',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT INTO "Table" VALUES(3,'Table 3',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT INTO "Table" VALUES(4,'Table 4',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT INTO "Table" VALUES(5,'Table 5',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT INTO "Table" VALUES(6,'Table 6',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

