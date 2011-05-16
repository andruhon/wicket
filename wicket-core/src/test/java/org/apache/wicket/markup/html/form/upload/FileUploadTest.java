/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.wicket.markup.html.form.upload;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.List;

import org.apache.wicket.WicketTestCase;
import org.apache.wicket.mock.MockApplication;
import org.apache.wicket.util.file.File;
import org.apache.wicket.util.file.FileUploadCleaner;
import org.apache.wicket.util.file.IFileUploadCleaner;
import org.apache.wicket.util.tester.FormTester;
import org.apache.wicket.util.tester.WicketTester;
import org.apache.wicket.util.upload.DiskFileItemFactory;
import org.apache.wicket.util.upload.FileItem;


/**
 * Test of FileUpload
 * 
 * @author Frank Bille (billen)
 */
public class FileUploadTest extends WicketTestCase
{

	/**
	 * Construct.
	 */
	public FileUploadTest()
	{
		super("Test of FileUpload");
	}

	@Override
	protected void setUp() throws Exception
	{
		tester = new WicketTester(new MockApplication())
		{
		};
	}

	/**
	 * Test that when getting an input stream a new input stream is returned every time.
	 * 
	 * Also test that the inputstream is saved internally for later closing.
	 * 
	 * @throws Exception
	 */
	public void testGetInputStream() throws Exception
	{
		IFileUploadCleaner fileUploadCleaner = new FileUploadCleaner();

		FileItem fileItem = new DiskFileItemFactory(fileUploadCleaner).createItem("dummyFieldName",
			"text/java", false, "FileUploadTest.java");
		// Initialize the upload
		fileItem.getOutputStream();

		// Get the internal list out
		Field inputStreamsField = FileUpload.class.getDeclaredField("inputStreamsToClose");
		inputStreamsField.setAccessible(true);

		FileUpload fileUpload = new FileUpload(fileItem);

		List<?> inputStreams = (List<?>)inputStreamsField.get(fileUpload);

		assertNull(inputStreams);

		InputStream is1 = fileUpload.getInputStream();
		inputStreams = (List<?>)inputStreamsField.get(fileUpload);

		assertEquals(1, inputStreams.size());

		InputStream is2 = fileUpload.getInputStream();
		inputStreams = (List<?>)inputStreamsField.get(fileUpload);

		assertEquals(2, inputStreams.size());

		assertNotSame(is1, is2);

		// Ok lets close all the streams
		try
		{
			fileUpload.closeStreams();
		}
		catch (Exception e)
		{
			fail();
		}

		inputStreams = (List<?>)inputStreamsField.get(fileUpload);

		assertNull(inputStreams);

		fileUploadCleaner.destroy();
	}

	/**
	 * @see <a href="https://issues.apache.org/jira/browse/WICKET-3715">WICKET-3715</a>
	 * @throws IOException
	 */
	public void testWriteToTempFile() throws IOException
	{
		tester.startPage(TestPage.class);

		File tmp = null;
		try
		{
			tmp = FileUploadFieldTest.writeTestFile(1);
			FormTester formtester = tester.newFormTester("form");
			formtester.setFile("upload", tmp, "text/plain");
			formtester.submit();

			TestPage page = (TestPage)tester.getLastRenderedPage();
			assertNotNull(page.testFile);
		}
		finally
		{
			if (tmp != null && tmp.exists())
			{
				tmp.delete();
			}
		}
	}

	/** */
	public static class TestPage extends MockPageWithFormAndUploadField
	{
		/** */
		private static final long serialVersionUID = 1L;
		java.io.File testFile;

		@Override
		protected void handleFormSubmit() throws Exception
		{
			super.handleFormSubmit();
			testFile = getFileUpload().writeToTempFile();
		}
	}
}
