-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(225) NOT NULL,
    "password" VARCHAR(225) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "teacher_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "stem" TEXT NOT NULL,
    "option1" TEXT NOT NULL,
    "option2" TEXT NOT NULL,
    "option3" TEXT NOT NULL,
    "option4" TEXT NOT NULL,
    "correct_option_number" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "module_id" INTEGER NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_answer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "answer" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "student_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "question_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "module_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
