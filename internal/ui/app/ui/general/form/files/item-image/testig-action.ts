"use server";

export type FormFileUploadTestingState = {
  status: string;
}

export async function TestFileUploadAction(
  currentState: FormFileUploadTestingState,
  formData: FormData,
) {
  const state: FormFileUploadTestingState = {
    status: "got nothing",
  }
  const data = {
    file: formData.get("file"),
  }
  const file_data = formData.getAll("file") as File[];
  console.log(file_data)

  }

  // const buffer = Buffer.from(await file_data.arrayBuffer());
  // console.log(buffer)
  state.status = "got this"

  return state
}
