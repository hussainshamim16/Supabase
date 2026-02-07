-- Purani policies delete
DROP POLICY IF EXISTS "Allow select for all" ON "Student Data";
DROP POLICY IF EXISTS "Allow insert for all" ON "Student Data";
DROP POLICY IF EXISTS "Allow update for all" ON "Student Data";
DROP POLICY IF EXISTS "Allow delete for all" ON "Student Data";

-- RLS enable (safe even if already enabled)
ALTER TABLE "Student Data" ENABLE ROW LEVEL SECURITY;

-- Fresh policies
CREATE POLICY "Allow select for all"
ON "Student Data"
FOR SELECT
USING (true);

CREATE POLICY "Allow insert for all"
ON "Student Data"
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update for all"
ON "Student Data"
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete for all"
ON "Student Data"
FOR DELETE
USING (true);
