interface Dto {
 firstName: string;
 lastName: string;
 title: string;
}

/**
 * Extracts the title of an employee.
 * @param employee
 */
function titleExtractor(employee: Dto) {
 return employee.title;
}

/**
 * Returns a compliment based on the employee's title.
 */
function admirationEvaluator(title: string | undefined) {
 switch (title) {
  case "Software Engineer":
   return "You are a genius!";
  case "Data Scientist":
   return "You are a wizard!";
  case "Product Manager":
   return "You are a visionary!";
  case undefined:
   return undefined;
  default:
   return "You are amazing!";
 }
}

// ================== Usage ==================

const employee: Dto = {
 firstName: "John",
 lastName: "Doe",
 title: "Software Engineer",
};

const tit = titleExtractor(employee);

const text = admirationEvaluator(tit);

const surelyUndefinedText = admirationEvaluator("Software Engineer");

console.log(text, surelyUndefinedText);
