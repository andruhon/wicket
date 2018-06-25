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
package org.apache.wicket.page;

import org.apache.wicket.Application;
import org.apache.wicket.Session;
import org.apache.wicket.pageStore.DefaultPageContext;
import org.apache.wicket.pageStore.IPageContext;
import org.apache.wicket.pageStore.IPageStore;
import org.apache.wicket.util.lang.Args;

/**
 * A manager of pages, i.e. a mediator between an {@link Application} and an {@link IPageStore}.
 */
public class PageManager implements IPageManager
{
	private final IPageStore store;
	
	public PageManager(IPageStore store) {
		this.store = Args.notNull(store, "store");
	}

	@Override
	public IManageablePage getPage(int pageId)
	{
		return store.getPage(createPageContext(), pageId);
	}

	@Override
	public void removePage(IManageablePage page)
	{
		store.removePage(createPageContext(), page);
	}

	@Override
	public void addPage(IManageablePage page)
	{
		store.addPage(createPageContext(), page);
	}

	@Override
	public void removeAllPages()
	{
		store.removeAllPages(createPageContext());
	}

	@Override
	public void detach()
	{
		store.detach(createPageContext());
	}

	/**
	 * Factory method for an {@link IPageContext}, returns a {@link DefaultPageContext} by default.
	 * 
	 * @return
	 */
	protected IPageContext createPageContext()
	{
		return new DefaultPageContext(Session.get());
	}

	@Override
	public void destroy()
	{
		store.destroy();
	}
	
	@Override
	public IPageStore getPageStore()
	{
		return store;
	}
}
