<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:cn="http://cnx.rice.edu/cnxml"
    xmlns:ep="http://epodreczniki.pl/"
    xmlns:epe="http://epodreczniki.pl/editor"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:cnxml="http://cnx.rice.edu/cnxml"
    xmlns:md="http://cnx.rice.edu/mdml"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:q="http://cnx.rice.edu/qml/1.0"
    xmlns:bib="http://bibtexml.sf.net/"
    xmlns:mml="http://www.w3.org/1998/Math/MathML"
    xmlns:bibtex="http://bibtexml.sf.net/"
    xmlns="http://www.w3.org/1999/xhtml"
    version="1.0">
    <xsl:import href="main_templates.xsl"/>
	<xsl:import href="custom_templates.xsl"/>
     
    <xsl:import href="table.xsl"/>
    <xsl:import href="bibtexml.xsl"/>
    <xsl:import href="metadata.xsl"/>
    <xsl:import href="review.xsl"/>

    <xsl:param name="showReviews" select="'false'"/>
    <xsl:param name="showPage" select="concat(//cn:section[1]/@id, '_page')"/>
    <xsl:param name="fullReviewMode" select="''"/>
    <xsl:param name="whiteSpaceView" select="'false'"/>
    
    <xsl:variable name="womi-image-url" select="'http://rt.epo.pl/repo/womi/'"/>
    
    <xsl:template match="/">
        <xsl:apply-templates select="cn:document"/>
    </xsl:template>
    
    <xsl:template match="cnxml:document">
        <html>
            <head>
								<meta charset="UTF-8"></meta>
                <title><xsl:value-of select="cn:title"/></title>
            </head>
            <body>
                <xsl:choose>
                    <xsl:when test="//ep:generated-type">
                        <div class="module-not-editable">
                            Moduł słownikowy autogenerowany, nie do edycji.
                        </div>
                    </xsl:when>
                    <xsl:when test="$metadataView='true'" >
						<xsl:apply-templates select="./cn:metadata" mode="metadata"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:choose>
							<xsl:when test="//epe:review[@epe:id=$fullReviewMode]">
							    <div class="report-panel page page-selected ">
							        <div class="report-panel-header page-header">
									    <span class="label">Raport recenzji modułu</span>
									</div>
							        <div class="report-panel-toolbar">
							            <button type="button" class="review-panel-button">
							                <xsl:attribute name="onclick">
							                    <xsl:text>showNoReviews();showReviewPanel();</xsl:text>
							                </xsl:attribute>
							            </button>
							        </div>
							        <div class="report-panel-contents">
										<div class="section">
											<xsl:apply-templates select="//cn:content" mode="full-review">
												<xsl:with-param name="showFullReview" select="true()"/>
											</xsl:apply-templates>
										</div>
							        </div>
								</div>
							</xsl:when>
                            <xsl:when test="$showReviews='true'">
                                <div class="main-panel with-reviews">
                                    <xsl:apply-templates select="*"/>
                                </div>
                                <div class="review-panel">
                                  <div class="report-panel-toolbar">
                                    <button type="button" class="hide-closed-reviews-panel-button" onmousedown="toggleHideClosedReviews()">
                                      <xsl:attribute name="title">
                                        <xsl:choose>
                                          <xsl:when test="$hideClosedReview='true'">Pokaż zamknięte recenzje</xsl:when>
                                          <xsl:otherwise>Ukryj zamknięte recenzje</xsl:otherwise>
                                        </xsl:choose>
                                      </xsl:attribute>
                                    </button>
                                  </div>
                                  <xsl:apply-templates select=".//cn:content" mode="comm" />
                                </div>
                            </xsl:when>
                            <xsl:otherwise>
                                <div class="main-panel">
                                    <xsl:apply-templates select="node()"/>
                                </div>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>
                </xsl:choose>
            </body>
        </html>
    </xsl:template>
	 
	 
     <xsl:template match="cn:content">
         <xsl:choose>
             <xsl:when test="cn:section[ep:parameters/ep:start-new-page='true']">
                 <xsl:apply-templates select="cn:section[ep:parameters/ep:start-new-page='true'][1]/preceding-sibling::*[self::cn:section]"></xsl:apply-templates>
                 <xsl:for-each select="cn:section[ep:parameters/ep:start-new-page='true']">
                     <xsl:variable name="current_page_count" select="count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])"></xsl:variable>
                     <xsl:variable name="current_section_count" select="count(preceding-sibling::cn:section)"></xsl:variable>
                     <div id="{@id}_page">
                         <xsl:choose>
                             <xsl:when test="concat(@id, '_page') = $showPage or $showPage = -1">
                                 <xsl:attribute name="class">page page-selected</xsl:attribute>
                                 <xsl:apply-templates select="preceding-sibling::*[self::ep:zebra-point and count(preceding-sibling::cn:section)=$current_section_count]"></xsl:apply-templates>
                                 <xsl:element name="div">
                                     <xsl:attribute name="class">page-header</xsl:attribute>
                                     <xsl:attribute name="onclick">
                                         <xsl:text>Editor.getActiveCanvas().setViewParam('showPage', '</xsl:text>
                                         <xsl:text>');</xsl:text>
                                     </xsl:attribute>
                                     <xsl:value-of select="concat('Pagina ', $current_page_count + 1, ':')"/>

                                 </xsl:element>
                     <xsl:variable name="reviews_between_new_pages" select=".//epe:review[epe:comment[last()]/@epe:comment-state != 'closed'] | following-sibling::cn:section[(not(ep:parameters/ep:start-new-page) or ep:parameters/ep:start-new-page='false') and count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])=$current_page_count+1]//epe:review[epe:comment[last()]/@epe:comment-state != 'closed']"/>
										 <xsl:if test="count($reviews_between_new_pages) > 0">
											 <xsl:element name="span">
												<xsl:attribute name="class">review-counter-tip</xsl:attribute>
												<xsl:attribute name="onclick">
													<xsl:if test="$showReviews!='true'">
														<xsl:text>showReviewsCommand.execute(Editor.getScope());</xsl:text>
													</xsl:if>
													<xsl:text>Editor.getActiveCanvas().setViewParam('showPage', '</xsl:text>
													<xsl:value-of select="concat(@id, '_page')"/>
													<xsl:text>');</xsl:text>
												</xsl:attribute>
												<xsl:text>Liczba komentarzy: </xsl:text>
												<xsl:value-of select="count($reviews_between_new_pages)"/>
											 </xsl:element>
										 </xsl:if>
                                 <xsl:variable name="content_between_new_pages" select="(following-sibling::cn:section)
                                                                                        [(not(ep:parameters/ep:start-new-page) or 
                                                                                          ep:parameters/ep:start-new-page='false') and 
                                                                                          count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])=$current_page_count+1]"/>
                                 <xsl:apply-templates select=".|$content_between_new_pages"></xsl:apply-templates>    
                             </xsl:when>
                             <xsl:otherwise>
                                 <xsl:attribute name="class">page</xsl:attribute>
                                 <xsl:apply-templates select="preceding-sibling::*[self::ep:zebra-point and count(preceding-sibling::cn:section)=$current_section_count]"></xsl:apply-templates>
                                 <xsl:element name="div">
                                     <xsl:attribute name="class">page-header</xsl:attribute>
                                     <xsl:element name="a">
                                         <xsl:attribute name="href">#</xsl:attribute>
                                         <xsl:attribute name="onclick">
                                             <xsl:text>Editor.getActiveCanvas().setViewParam('showPage', '</xsl:text>
                                             <xsl:value-of select="concat(@id, '_page')"/>
                                             <xsl:text>');</xsl:text>
                                         </xsl:attribute>
                                         <xsl:text>Pagina </xsl:text>
                                         <xsl:value-of select="$current_page_count + 1"/>
                                         <xsl:if test="./cn:title != ''">
                                             <xsl:value-of select="concat(': ', ./cn:title)"/>
                                         </xsl:if>
                                     </xsl:element>
										 <xsl:variable name="reviews_between_new_pages" select=".//epe:review[epe:comment[last()]/@epe:comment-state != 'closed'] | following-sibling::cn:section[(not(ep:parameters/ep:start-new-page) or ep:parameters/ep:start-new-page='false') and count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])=$current_page_count+1]//epe:review[epe:comment[last()]/@epe:comment-state != 'closed']"/>
										 <xsl:if test="count($reviews_between_new_pages) > 0">
											 <xsl:element name="span">
												<xsl:attribute name="class">review-counter-tip</xsl:attribute>
												<xsl:attribute name="onclick">
													<xsl:if test="$showReviews!='true'">
														<xsl:text>showReviewsCommand.execute(Editor.getScope());</xsl:text>
													</xsl:if>
													<xsl:text>Editor.getActiveCanvas().setViewParam('showPage', '</xsl:text>
													<xsl:value-of select="concat(@id, '_page')"/>
													<xsl:text>');</xsl:text>
												</xsl:attribute>
												<xsl:text>Liczba komentarzy: </xsl:text>
												<xsl:value-of select="count($reviews_between_new_pages)"/>
											 </xsl:element>
										 </xsl:if>
                                 </xsl:element>
                             </xsl:otherwise>
                         </xsl:choose>
                     </div>
                 </xsl:for-each>
             </xsl:when>
             <xsl:otherwise>
                 <xsl:apply-templates></xsl:apply-templates>  
             </xsl:otherwise>
         </xsl:choose>
     </xsl:template>
    
    <xsl:template match="cn:*[ancestor::cn:content]|ep:*[ancestor::cn:content]" priority="0">
        <xsl:variable name="name" select="local-name()"></xsl:variable>
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
                <xsl:apply-templates select="current()" mode="label"/>
                <xsl:text> </xsl:text>
                <xsl:apply-templates select="node()[local-name() = 'title']"/>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
     <xsl:template match="cnxml:title">
         <span class="title"><xsl:apply-templates select="node()" /></span>
     </xsl:template>
    
    <xsl:template match="cnxml:document/cnxml:title">
      <h1>
				<xsl:attribute name="class">
					<xsl:if test="$whiteSpaceView='true'">
						<xsl:text> show-white-space</xsl:text>
					</xsl:if>
        </xsl:attribute>
				<xsl:apply-templates select="node()" />
				<span onmousedown="changeMdView()" class="open-metadata-view" title="Widok metadanych"/>
			</h1>
    </xsl:template>
    
    <xsl:template match="cn:section">
        <xsl:if test="not(ep:parameters/ep:start-new-page)">
            <xsl:variable name="current_section_count" select="count(preceding-sibling::cn:section)"></xsl:variable>
            <xsl:apply-templates select="preceding-sibling::*[self::ep:zebra-point and count(preceding-sibling::cn:section)=$current_section_count]"></xsl:apply-templates>
        </xsl:if>
        <xsl:variable name="name" select="local-name()"></xsl:variable>
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
                <xsl:if test="$whiteSpaceView='true'">
					<xsl:text> show-white-space</xsl:text>
				</xsl:if>
            </xsl:attribute>
            <xsl:apply-templates select="ep:parameters/ep:columns|ep:parameters/ep:width"></xsl:apply-templates>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
                <xsl:apply-templates select="current()" mode="label"/>
                <xsl:text> </xsl:text>
                <xsl:apply-templates select="node()[local-name() = 'title']"/>
				<span class="column-button-container">
					<xsl:if test="parent::cn:content">
					    <button>
					        <xsl:attribute name="onClick">
					            <xsl:choose>
					                <xsl:when test="./ep:parameters/ep:start-new-page = 'true'">
					                    <xsl:text>setNewPage(this, node);</xsl:text>
					                    <xsl:text>Editor.getActiveCanvas().setViewParam('showPage', '</xsl:text>
					                    <xsl:value-of select="concat(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'][1]/@id, '_page')"/>
					                    <xsl:text>');</xsl:text>
					                </xsl:when>
					                <xsl:otherwise>
					                    <xsl:text>setNewPage(this, node);</xsl:text>
					                    <xsl:text>Editor.getActiveCanvas().setViewParam('showPage', '</xsl:text>
					                    <xsl:value-of select="concat(@id, '_page')"/>
					                    <xsl:text>');</xsl:text>
					                </xsl:otherwise>
					            </xsl:choose>
					        </xsl:attribute>
							<xsl:attribute name="class">
								<xsl:choose>
									<xsl:when test="./ep:parameters/ep:start-new-page = 'true'">unset-new-page</xsl:when>
									<xsl:otherwise>set-new-page</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
					        <xsl:attribute name="title">
					            <xsl:choose>
					                <xsl:when test="./ep:parameters/ep:start-new-page = 'true'">Usuń paginę</xsl:when>
					                <xsl:otherwise>Dodaj nową paginę</xsl:otherwise>
					            </xsl:choose>
					        </xsl:attribute>
						</button>
					    <button class="add-column" onClick="" title="Dodaj nową kolumnę">
							<xsl:attribute name="onClick">
								<xsl:choose>
									<xsl:when test="./ep:parameters/ep:columns !=''">
										<xsl:value-of select="concat('addColumn(this,node,', ./ep:parameters/ep:columns, ')')"/>
									</xsl:when>
									<xsl:otherwise>
										addColumn(this,node,0)
									</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
						</button>
						<button onClick="toggleParameterFoldable(this, node)">
							<xsl:attribute name="class">
								<xsl:choose>
									<xsl:when test="./ep:parameters/ep:foldable = 'true'">toggle-foldable value-true</xsl:when>
									<xsl:otherwise>toggle-foldable</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
							<xsl:attribute name="title">
					            <xsl:choose>
					                <xsl:when test="./ep:parameters/ep:foldable = 'true'">Usuń parametr 'zwijalna'</xsl:when>
					                <xsl:otherwise>Ustaw parametr 'zwijalna'</xsl:otherwise>
					            </xsl:choose>
					        </xsl:attribute>
						</button>
						<xsl:if test="./ep:parameters/ep:columns >=2">
						    <button class="edit-columns-width" onClick="openDialog(this, node, 'html-extra/column-width-dialog.html', 'Szerokość kolumn')"  title="Zmień szerokość kolumn" />
						    <button onClick="toggleParameterStretch(this, node)">
						        <xsl:attribute name="class">
						            <xsl:choose>
						                <xsl:when test="./ep:parameters/ep:stretch = 'full-width'">toggle-stretch full-width</xsl:when>
						                <xsl:when test="./ep:parameters/ep:stretch = 'extended-width'">toggle-stretch extended-width</xsl:when>
						                <xsl:when test="./ep:parameters/ep:stretch = 'extended-shifted-width'">toggle-stretch extended-shifted-width</xsl:when>
						                <xsl:otherwise>toggle-stretch default-width</xsl:otherwise>
						            </xsl:choose>
						        </xsl:attribute>
						        <xsl:attribute name="title">
						            <xsl:choose>
						                <xsl:when test="./ep:parameters/ep:stretch = 'full-width'">Szerokość sekcji na całą stronę</xsl:when>
						                <xsl:when test="./ep:parameters/ep:stretch = 'extended-width'">Szerokość sekcji powiększona</xsl:when>
						                <xsl:when test="./ep:parameters/ep:stretch = 'extended-shifted-width'">Szerokość sekcji powiększona przesunięta</xsl:when>
						                <xsl:otherwise>Szerokość sekcji standardowa</xsl:otherwise>
						            </xsl:choose>
						        </xsl:attribute>
						    </button>
						</xsl:if>
					    
					    <button onClick="toggleParameterStretchTitle(this, node)">
					        <xsl:attribute name="class">
					            <xsl:choose>
					                <xsl:when test="./ep:parameters/ep:stretch-title = 'full-width'">toggle-stretch full-width</xsl:when>
					                <xsl:when test="./ep:parameters/ep:stretch-title = 'extended-width'">toggle-stretch extended-width</xsl:when>
					                <xsl:otherwise>toggle-stretch default-width</xsl:otherwise>
					            </xsl:choose>
					        </xsl:attribute>
					        <xsl:attribute name="title">
					            <xsl:choose>
					                <xsl:when test="./ep:parameters/ep:stretch-title = 'full-width'">Szerokość tytułu na całą stronę</xsl:when>
					                <xsl:when test="./ep:parameters/ep:stretch-title = 'extended-width'">Szerokość tytułu powiększona</xsl:when>
					                <xsl:otherwise>Szerokość tytułu standardowa</xsl:otherwise>
					            </xsl:choose>
					        </xsl:attribute>
					    </button>
					</xsl:if>
					<xsl:if test="ep:parameters/ep:width">
					    <button class="rm-column" onClick="" title="Usuń kolumnę">
							<xsl:attribute name="onClick">
								<xsl:choose>
									<xsl:when test="../ep:parameters/ep:columns !=''">
										<xsl:value-of select="concat('rmColumn(this,node,', ../ep:parameters/ep:columns, ')')"/>
									</xsl:when>
									<xsl:otherwise>
										rmColumn(this,node,0)
									</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
						</button>
					</xsl:if>
				    <xsl:apply-templates select="node()[local-name() = 'parameters']"/>
				</span>
			</xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'title' and local-name() != 'parameters']"></xsl:apply-templates>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="ep:parameters/ep:columns|ep:parameters/ep:width">
        <xsl:attribute name="data-{local-name()}"><xsl:value-of select="."/></xsl:attribute>
    </xsl:template>
	
	<xsl:template match="ep:format">
		<div class="format">
			<div class="format-header">
				<xsl:apply-templates select="." mode="label"/>
			</div>
			<div class="format-content">
			    <xsl:apply-templates select="." mode="translate_pl"/>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="ep:format" mode="translate_pl">
		<xsl:choose>
			<xsl:when test="text() = 'classicmobile'">
				<xsl:text>Klasyczny i mobilny</xsl:text>
			</xsl:when>
			<xsl:when test="text() = 'static'">
				<xsl:text>Statyczny</xsl:text>
			</xsl:when>
			<xsl:when test="text() = 'static-mono'">
				<xsl:text>Statyczny monochromatyczny</xsl:text>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
    
    <xsl:template match="cn:section/cn:title">
        <h2>
            <xsl:apply-templates select="node()" />  
            <xsl:text> </xsl:text>
        </h2>
    </xsl:template>
    
    <xsl:template match="cnxml:metadata">
    </xsl:template> 
    
     <xsl:template match="cnxml:sub">
         <sub><xsl:apply-templates></xsl:apply-templates></sub>
     </xsl:template>
     
     <xsl:template match="cnxml:sup">
         <sup><xsl:apply-templates></xsl:apply-templates></sup>
     </xsl:template>
     
     <xsl:template name="ep:parameters">
     </xsl:template>
     
    <xsl:template match="ep:parameters">
        <span class="section-parameters" title="Parametry sekcji"/>
    </xsl:template>
    
    <xsl:template match="ep:start-new-page">
    </xsl:template>
    
    <xsl:template match="ep:foldable">
    </xsl:template>
    
    <xsl:template match="ep:stretch">
    </xsl:template>

    <xsl:template match="cn:equation">
		<xsl:element name="div">
			<xsl:attribute name="class">
				<xsl:value-of select="local-name()"/>
			</xsl:attribute>
			<xsl:apply-templates/>
		</xsl:element>
    </xsl:template>
     
    <xsl:template match="ep:lead">
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
     
	<xsl:template match="mml:math">
		<span calss="mml-math" onclick="openMathMLDialog(this, node)">
			<xsl:copy-of select="."/>
		</span>
	</xsl:template>
     
    <xsl:template match="cn:para">
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
            <xsl:if test="$whiteSpaceView='true'">
							<span class="para-end">&#182;</span>
						</xsl:if>
        </xsl:element>
    </xsl:template>
    
     <xsl:template match="cn:definition|ep:concept">
        <div>
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
                <xsl:apply-templates select="@ep:presentation-variant"/>
            </xsl:attribute>
            <div class="{local-name()}-header">
                <xsl:apply-templates select="current()" mode="label"/>
                <xsl:text> </xsl:text>
                <xsl:apply-templates select="cn:term" />
            </div>
            <div class="{local-name()}-contents">
                <xsl:apply-templates select="cn:meaning|cn:example" />
            </div>
            <xsl:apply-templates select="ep:source"/>
        </div>
    </xsl:template>
    
    <xsl:template match="cn:note">
        <xsl:variable name="name" select="local-name()"></xsl:variable>
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
                <xsl:apply-templates select="@ep:presentation-variant"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="@type"/>
                </xsl:attribute>
                <xsl:apply-templates select="current()" mode="label"/>
                <xsl:text> </xsl:text>
                <xsl:apply-templates select="node()[local-name() = 'title']"/>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="cnxml:term">
        <span class="term"><xsl:apply-templates select="node()" /></span>
    </xsl:template>
     
    <xsl:template match="cnxml:link">
        <span class="link" onclick="openDialog(this, node, 'html-extra/bookmark-dialog.html','Atrybuty odnośnika')" ><xsl:apply-templates select="node()" /></span>
    </xsl:template>
    
     <xsl:template match="cnxml:list[@list-type='bulleted' or not(@list-type)]">
         <xsl:element name="div">
             <xsl:attribute name="class">
                 <xsl:value-of select="local-name()"/>
             </xsl:attribute>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-header')"/>
                 </xsl:attribute>
                 <xsl:apply-templates select="." mode="label"></xsl:apply-templates>
                 <xsl:text> </xsl:text>
                 <xsl:apply-templates select="node()[local-name() = 'title']"/>
             </xsl:element>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-contents')"/>
                 </xsl:attribute>
                 <xsl:element name="ul">
                     <xsl:attribute name="class">
                         <xsl:value-of select="local-name()"/>
                     </xsl:attribute>    
                     <xsl:apply-templates select="node()[local-name() != 'title']" />
                 </xsl:element>
             </xsl:element>
         </xsl:element>
     </xsl:template>
     
     <xsl:template match="cnxml:list[@list-type='enumerated']">
         <xsl:element name="div">
             <xsl:attribute name="class">
                 <xsl:value-of select="local-name()"/>
             </xsl:attribute>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-header')"/>
                 </xsl:attribute>
                 <xsl:apply-templates select="." mode="label"></xsl:apply-templates>
                 <xsl:text> </xsl:text>
                 <xsl:apply-templates select="node()[local-name() = 'title']"/>
             </xsl:element>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-contents')"/>
                 </xsl:attribute>
                 <xsl:element name="ol">
                     <xsl:attribute name="class">
                         <xsl:value-of select="local-name()"/>
                     </xsl:attribute>  
                     <xsl:attribute name="type">
                         <xsl:choose>
                             <xsl:when test="@number-style='arabic'">1</xsl:when>
                             <xsl:when test="@number-style='lower-roman'">i</xsl:when>
                             <xsl:when test="@number-style='upper-roman'">I</xsl:when>
                             <xsl:when test="@number-style='lower-alpha'">a</xsl:when>
                             <xsl:when test="@number-style='upper-alpha'">A</xsl:when>
                             <xsl:otherwise>1</xsl:otherwise>
                         </xsl:choose>
                     </xsl:attribute>
                     <xsl:if test="@start-value">
                         <xsl:attribute name="start"><xsl:value-of select="@start-value"/></xsl:attribute>
                     </xsl:if>

                     <xsl:apply-templates select="node()[local-name() != 'title']" />
                 </xsl:element>
             </xsl:element>
         </xsl:element>
     </xsl:template>
    
    <xsl:template match="cnxml:list[@list-type='enumerated-full-path']">
        <xsl:variable name="list_fullItemPath">
            <xsl:if test="@list-type='enumerated-full-path'">
                <xsl:for-each select="ancestor-or-self::cnxml:list[ancestor::cnxml:item]">
                    <xsl:call-template name="get_item_list_prefix">
                        <xsl:with-param name="itemPosition" select="count(ancestor::cnxml:item[1]/preceding-sibling::cnxml:item)+1"/>
                        <xsl:with-param name="listProperties" select="ancestor::cnxml:list[1]"/>
                    </xsl:call-template>
                        <xsl:value-of select="ancestor::cnxml:list[1]/@mark-suffix"/>
                </xsl:for-each>
            </xsl:if>
        </xsl:variable>
        
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
                <xsl:apply-templates select="." mode="label"></xsl:apply-templates>
                <xsl:text> </xsl:text>
                <xsl:apply-templates select="node()[local-name() = 'title']"/>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:element name="ol">
                    <xsl:attribute name="class">
                        <xsl:value-of select="concat(local-name(), ' enumerated-full-path')"/>
                    </xsl:attribute>                      
                    <xsl:apply-templates select="node()[local-name() != 'title']" >
                        <xsl:with-param name="list_fullItemPath" select="$list_fullItemPath"></xsl:with-param>
                    </xsl:apply-templates>
                </xsl:element>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    
    <xsl:template name="item-decoration">
        <xsl:param name="list_fullItemPath"/>
        <xsl:element name="span">
            <xsl:attribute name="class">item-decoration</xsl:attribute>
            <xsl:choose>
                <xsl:when test="parent::cnxml:list[@list-type='enumerated-full-path']">
                    <xsl:value-of select="$list_fullItemPath"></xsl:value-of>
                    
                    <xsl:call-template name="get_item_list_prefix">
                        <xsl:with-param name="itemPosition" select="position()"/>
                        <xsl:with-param name="listProperties" select="parent::cnxml:list"/>
                    </xsl:call-template>
                    <xsl:value-of select="parent::cnxml:list/@mark-suffix"/>
                    
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test="parent::cnxml:list[@bullet-style]">
                        <xsl:choose>
                            <xsl:when test="parent::cnxml:list[@bullet-style='bullet']">•</xsl:when>
                            <xsl:when test="parent::cnxml:list[@bullet-style='open-circle']">○</xsl:when>
                            <xsl:when test="parent::cnxml:list[@bullet-style='pilcrow']">¶</xsl:when>
                            <xsl:when test="parent::cnxml:list[@bullet-style='rpilcrow']">⁋</xsl:when>
                            <xsl:when test="parent::cnxml:list[@bullet-style='asterisk']">*</xsl:when>
                            <xsl:when test="parent::cnxml:list[@bullet-style='dash']">–</xsl:when>
                            <xsl:when test="parent::cnxml:list[@bullet-style='section']">§</xsl:when>
                            <xsl:when test="parent::cnxml:list[@bullet-style='none']"/>
                            <xsl:otherwise>
                                <xsl:value-of select="parent::cnxml:list/@bullet-style"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:if>
                    <xsl:if test="parent::cnxml:list[@list-type='enumerated']">
                        <xsl:call-template name="get_item_list_prefix">
                            <xsl:with-param name="itemPosition" select="position()"/>
                            <xsl:with-param name="listProperties" select="parent::cnxml:list"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:choose>
                        <xsl:when test="parent::cnxml:list[@mark-suffix]">
                            <xsl:value-of select="parent::cnxml:list/@mark-suffix"/>
                        </xsl:when>
                        <xsl:when test="parent::cnxml:list[@list-type='enumerated']">
                            <xsl:text>.</xsl:text>
                        </xsl:when>
                        <xsl:when test="parent::cnxml:list[@list-type='labeled-item']">
                            <xsl:text>:</xsl:text>
                        </xsl:when>
                    </xsl:choose>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
        <xsl:if test="not(parent::cnxml:list[@list-type='labeled-item'] and not(cnxml:label[node()]))">
            <xsl:text> </xsl:text>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="get_item_list_prefix">
        <xsl:param name="listProperties"/>
        <xsl:param name="itemPosition"/>
        
        <xsl:variable name="start-value">
            <xsl:choose>
                <xsl:when test="$listProperties[@start-value]">
                    <xsl:value-of select="$listProperties/@start-value"/>
                </xsl:when>
                <xsl:otherwise>1</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$listProperties[@number-style='upper-alpha']">
                <xsl:number format="A" value="$itemPosition + $start-value - 1"/>
            </xsl:when>
            <xsl:when test="$listProperties[@number-style='lower-alpha']">
                <xsl:number format="a" value="$itemPosition + $start-value - 1"/>
            </xsl:when>
            <xsl:when test="$listProperties[@number-style='upper-roman']">
                <xsl:number format="I" value="$itemPosition + $start-value - 1"/>
            </xsl:when>
            <xsl:when test="$listProperties[@number-style='lower-roman']">
                <xsl:number format="i" value="$itemPosition + $start-value - 1"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:number format="1" value="$itemPosition + $start-value - 1"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
     <xsl:template match="cnxml:item">
        <xsl:param name="list_fullItemPath"/>
        <li>
            <div class="para">
                <xsl:call-template name="item-decoration">
                    <xsl:with-param name="list_fullItemPath" select="$list_fullItemPath"></xsl:with-param>
                </xsl:call-template>
                <xsl:apply-templates select="cnxml:para/node()"/>
                <xsl:if test="$whiteSpaceView='true'">
									 <span class="para-end">&#182;</span>
								</xsl:if>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="ep:biography|ep:event">
        <div class="{local-name()}">
            <div class="{local-name()}-header">
                <xsl:apply-templates select="." mode="label"/>
            </div>
            <div class="{local-name()}-contents">
                <div class="{local-name()}-info">
                    <xsl:apply-templates select="ep:name|ep:reference" />
                    <div class="{local-name()}-metrics">
                        <xsl:apply-templates select="ep:birth|ep:death|ep:event-start|ep:event-end"/>
                    </div>
                </div>
                <xsl:apply-templates select="ep:content"/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="ep:name">
        <div class="name"><xsl:apply-templates/></div>
    </xsl:template>
    
    <xsl:template match="ep:birth|ep:death|ep:event-start|ep:event-end">
        <xsl:apply-templates select="node()"/>
    </xsl:template>
    
    <xsl:template match="ep:date">
        <div class="{local-name(parent::node())}-date">
            <div class="{local-name(parent::node())}-date-header">
                <xsl:choose>
                    <xsl:when test="parent::ep:birth">Data urodzenia: </xsl:when>
                    <xsl:when test="parent::ep:death">Data śmierci: </xsl:when>
                    <xsl:when test="parent::ep:event-start">Data rozpoczęcia: </xsl:when>
                    <xsl:when test="parent::ep:event-end">Data zakończenia: </xsl:when>
                    <xsl:otherwise>Data: </xsl:otherwise>
                </xsl:choose>
            </div>
            <div class="{local-name(parent::node())}-date-contents">       
                <xsl:choose>
                    <xsl:when test="@ep:type = 'date'">
                        <xsl:call-template name="get_date"></xsl:call-template>
                    </xsl:when>
                    <xsl:when test="@ep:type = 'year'">
                        <xsl:call-template name="get_year"></xsl:call-template>
                    </xsl:when>
                    <xsl:when test="@ep:type = 'around-year'">
                        <xsl:call-template name="get_year"></xsl:call-template>
                    </xsl:when>
                    <xsl:when test="@ep:type = 'century'">
                        <xsl:call-template name="get_century"></xsl:call-template>
                    </xsl:when>
                    <xsl:when test="@ep:type = 'beginning-of-century'">
                        <xsl:call-template name="get_century"></xsl:call-template>
                    </xsl:when>
                    <xsl:when test="@ep:type = 'end-of-century'">
                        <xsl:call-template name="get_century"></xsl:call-template>
                    </xsl:when>
                    <xsl:when test="@ep:type = 'turn-of-century'">
                        <xsl:call-template name="get_century"></xsl:call-template>
                    </xsl:when>
                    <xsl:when test="@ep:type = 'middle-of-century'">
                        <xsl:call-template name="get_century"></xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="get_date"></xsl:call-template>
                    </xsl:otherwise>
                </xsl:choose>
                <button onclick="openDialog(this,node, 'html-extra/date-picker-dialog.html','Zmień datę')" class="open-date-dialog" title="Zmień datę"/>
            </div>
        </div>
    </xsl:template>

    <xsl:template name="get_date">
        <xsl:if test="ep:date-start">
            <xsl:if test="ep:date-start/ep:day">
                <xsl:value-of select="concat(ep:date-start/ep:day, '.')"/>
            </xsl:if>
            <xsl:if test="ep:date-start/ep:month">
                <xsl:value-of select="concat(ep:date-start/ep:month, '.')"/>
            </xsl:if>
            <xsl:if test="number(ep:date-start/ep:year) &lt; 0">
                <xsl:value-of select="substring(ep:date-start/ep:year, 2)"/>
                <xsl:text> </xsl:text>
                <xsl:text>p.n.e.</xsl:text>
            </xsl:if>
            <xsl:if test="number(ep:date-start/ep:year) &gt; 0">
                <xsl:value-of select="number(ep:date-start/ep:year)"/>
            </xsl:if>
        </xsl:if>
        <xsl:if test="ep:date-start and ep:date-end and ep:date-end != '0'"><xsl:text> — </xsl:text></xsl:if>
        <xsl:if test="ep:date-end and ep:date-end != '0'">
            <xsl:if test="ep:date-end/ep:day">
                <xsl:value-of select="concat(ep:date-end/ep:day, '.')"/>
            </xsl:if>
            <xsl:if test="ep:date-end/ep:month">
                <xsl:value-of select="concat(ep:date-end/ep:month, '.')"/>
            </xsl:if>
            <xsl:if test="number(ep:date-end/ep:year) &lt; 0">
                <xsl:value-of select="substring(ep:date-end/ep:year, 2)"/>
                <xsl:text> </xsl:text>
                <xsl:text>p.n.e.</xsl:text>
            </xsl:if>
            <xsl:if test="number(ep:date-end/ep:year) &gt; 0">
                <xsl:value-of select="number(ep:date-end/ep:year)"/>
            </xsl:if>
        </xsl:if>
    </xsl:template>
     
    <xsl:template name="get_year">
     <xsl:variable name="output">
         <xsl:if test="@ep:type='around-year'">
             <xsl:text>ok.</xsl:text>
             <xsl:text> </xsl:text>
         </xsl:if>
         <xsl:choose>
             <xsl:when test="ep:date-start/ep:year > 0">
                 <xsl:value-of select="ep:date-start/ep:year"/>
                 <xsl:text> </xsl:text>
                 <xsl:text>r.</xsl:text>
             </xsl:when>
             <xsl:otherwise>
                 <xsl:value-of select="substring(ep:date-start/ep:year,2)"/>
                 <xsl:text> </xsl:text>
                 <xsl:text>r.</xsl:text>
                 <xsl:text> </xsl:text>
                 <xsl:text>p.n.e</xsl:text>
             </xsl:otherwise>
         </xsl:choose>
     </xsl:variable>
     <xsl:value-of select="$output"></xsl:value-of>
    </xsl:template>
     
     <xsl:template name="get_century">
         <xsl:variable name="type" select="@ep:type"/>
         <xsl:variable name="start-year">
                 <xsl:copy-of select="number(ep:date-start/ep:year)"></xsl:copy-of>
         </xsl:variable>
         <xsl:variable name="century">
             <xsl:choose>
                 <xsl:when test="$start-year > 0">
                     <xsl:variable name="year" select="$start-year -1"></xsl:variable>
                     <xsl:variable name="century" select="($year - ($year  mod 100)) div 100 + 1"></xsl:variable>
                     <xsl:choose>
                         <xsl:when test="@ep:type='beginning-of-century'">
                             <xsl:text>początek</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>n.e.</xsl:text>
                         </xsl:when>
                         <xsl:when test="@ep:type='end-of-century'">
                             <xsl:text>koniec</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>n.e.</xsl:text>
                         </xsl:when>
                         <xsl:when test="@ep:type='middle-of-century'">
                             <xsl:text>połowa</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>n.e.</xsl:text>
                         </xsl:when>
                         <xsl:when test="@ep:type='turn-of-century'">
                             <xsl:text>przełom</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>i</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century+1" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>n.e.</xsl:text>
                         </xsl:when>
                         <xsl:otherwise>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>n.e.</xsl:text>
                         </xsl:otherwise>
                     </xsl:choose>
                     
                 </xsl:when>
                 <xsl:otherwise>
                     <xsl:variable name="year" select="$start-year +1"></xsl:variable>
                     <xsl:variable name="century" select="((-$year) - ((-$year) mod 100)) div 100 + 1"></xsl:variable>
                     <xsl:choose>
                         <xsl:when test="@ep:type='beginning-of-century'">
                             <xsl:text>początek</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>p.n.e.</xsl:text>
                         </xsl:when>
                         <xsl:when test="@ep:type='end-of-century'">
                             <xsl:text>koniec</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>p.n.e.</xsl:text>
                         </xsl:when>
                         <xsl:when test="@ep:type='middle-of-century'">
                             <xsl:text>połowa</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>p.n.e.</xsl:text>
                         </xsl:when>
                         <xsl:when test="@ep:type='turn-of-century'">
                             <xsl:text>przełom</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>i</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:number value="$century+1" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>p.n.e.</xsl:text>
                         </xsl:when>
                         <xsl:otherwise>
                             <xsl:number value="$century" format="I"></xsl:number>
                             <xsl:text> </xsl:text>
                             <xsl:text>w.</xsl:text>
                             <xsl:text> </xsl:text>
                             <xsl:text>p.n.e.</xsl:text>
                         </xsl:otherwise>
                     </xsl:choose>
                 </xsl:otherwise>
             </xsl:choose>
         </xsl:variable>
         <xsl:value-of select="$century"></xsl:value-of>
     </xsl:template>
    
    <xsl:template match="ep:location">
        <div class="{local-name(parent::node())}-location">
            <div class="{local-name(parent::node())}-location-header">
                <xsl:choose>
                    <xsl:when test="parent::ep:birth">Miejsce urodzenia: </xsl:when>
                    <xsl:when test="parent::ep:death">Miejsce śmierci: </xsl:when>
                    <xsl:when test="parent::ep:event-start">Miejsce rozpoczęcia: </xsl:when>
                    <xsl:when test="parent::ep:event-end">Miejsce zakończenia: </xsl:when>
                    <xsl:otherwise>Miejsce: </xsl:otherwise>
                </xsl:choose>
            </div> 
            <div class="{local-name(parent::node())}-location-contents"><xsl:value-of select="."/></div>
        </div>
    </xsl:template>
    
    <xsl:template match="ep:content">
			<xsl:param name="classic-content" />
        <div class="content">
					<xsl:if test="$classic-content!='true'">
            <div class="content-header">
                <xsl:choose>
                    <xsl:when test="@ep:format = 'classic'">Tekst skojarzony klasyczny: </xsl:when>
                    <xsl:when test="@ep:format = 'mobile'">Tekst skojarzony mobilny: </xsl:when>
                    <xsl:when test="@ep:format = 'static'">Tekst skojarzony statyczny: </xsl:when>
                    <xsl:when test="@ep:format = 'static-mono'">Tekst skojarzony statyczny mono: </xsl:when>
                </xsl:choose>
                <xsl:if test="parent::ep:reference">
									<button onmousedown="rmWomiContent(this, node)" class="rm-womi-content" title="Usuń tekst skojarzony"/> 
								</xsl:if>
            </div>
          </xsl:if>
            <div class="content-contents">
                <xsl:apply-templates/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="ep:gallery">
        <xsl:element name="div">
            <xsl:attribute name="class">womi-gallery</xsl:attribute>
            <xsl:apply-templates select="@ep:*"></xsl:apply-templates>
            <xsl:element name="div">
                <xsl:attribute name="class">womi-gallery-header</xsl:attribute>
                <xsl:apply-templates select="." mode="label"/>
                <xsl:choose>
                    <xsl:when test="@ep:view-width and @ep:view-height">
                        <xsl:text> typu B</xsl:text>
                    </xsl:when>
                    <xsl:when test="@ep:miniatures-only='true'">
                        <xsl:text> typu C</xsl:text>
                    </xsl:when>
                    <xsl:when test="@ep:playlist">
                        <xsl:text> typu D</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text> typu A</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:if test="node()[local-name() = 'title']">
                    <xsl:text>: </xsl:text>
                    <xsl:apply-templates select="node()[local-name() = 'title']"></xsl:apply-templates>
                </xsl:if>
                <span onmousedown="openDialog(this, node, 'html-extra/womi-gallery-dialog.html','Atrybuty galerii')" class="open-gallery-dialog" title="Pokaż atrybuty galerii"/>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">womi-gallery-contents</xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'title' and local-name()!='content']"/>
                
                <xsl:if test="ep:content">
                    <div class="contents-container">
    					<div class="content">
    						<div class="content-header">
    							Tekst skojarzony galerii klasyczny:<button onmousedown="toggleEditableContent(this)" class="toggle-editable-content" title="Pokaż tekst skojarzony"/> 
    						</div>
    						<div class="content-contents">
    							<xsl:apply-templates select="ep:content[@ep:format='classic']">
										<xsl:with-param name="classic-content">true</xsl:with-param> 
									</xsl:apply-templates>
    						</div>
    					</div>
    					
    					<div class="editable-contents-container hidden">
    						<xsl:apply-templates select="ep:content"/>
    					</div>  
    				</div>
                </xsl:if>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="ep:gallery/@*">
        <xsl:attribute name="data-{local-name()}">
            <xsl:value-of select="."/>
        </xsl:attribute>
    </xsl:template>
         
    <xsl:template match="ep:gallery/cnxml:title">
        <span class="gallery-title"><xsl:apply-templates select="node()" /></span>
    </xsl:template>
    
    <xsl:template match="ep:reference">
        <div class="womi-container">
            <xsl:call-template name="get_womi_image"></xsl:call-template>
            <span onmousedown="openDialog(this, node, 'html-extra/womi-dialog.html','Atrybuty womi')" class="open-womi-dialog" title="Pokaż atrybuty womi"/>
            <xsl:apply-templates select="ep:disabled-alternative-reference"/>
            <xsl:if test="not(ep:content)">
							<button onmousedown="addWomiContent(this, node)" class="add-womi-content" title="Dodaj tekst skojarzony"/> 
            </xsl:if>
        </div>
		<xsl:if test="ep:content">
			<div class="contents-container">
				<div class="content">
					<div class="content-header">Tekst skojarzony klasyczny:<button onmousedown="toggleEditableContent(this)" class="toggle-editable-content" title="Pokaż tekst skojarzony"/>
						<xsl:if test="count(ep:content) &lt; 4">
							<button onmousedown="addWomiContent(this, node)" class="add-womi-content" title="Dodaj tekst skojarzony"/> 
						</xsl:if>
					</div>
					<div class="content-contents">
						<xsl:apply-templates select="ep:content[@ep:format='classic']">
							<xsl:with-param name="classic-content">true</xsl:with-param> 
						</xsl:apply-templates>
					</div>
				</div>
				
				<div class="editable-contents-container hidden">
					<xsl:apply-templates select="ep:content"/>
				</div>  
			</div>
		</xsl:if>
    </xsl:template>
    
    <xsl:template match="ep:disabled-alternative-reference">
        <span onmousedown="openDialog(this, node, 'html-extra/glossary-reference-dialog.html', 'Edytuj odwołanie')" class="open-alternative-dialog" title="Odwołanie do opisu alternatywnego"/>
    </xsl:template>
    
    <xsl:template match="ep:reference[*[local-name() = 'engine'] = 'womi_attachment']">
        <div class="womi-container attachment" title="Załącznik">
            <xsl:call-template name="get_womi_image"></xsl:call-template>
            <span onmousedown="openDialog(this, node, 'html-extra/womi-dialog.html','Atrybuty womi')" class="open-womi-dialog" title="Pokaż atrybuty womi"/> 
            <xsl:apply-templates select="ep:disabled-alternative-reference"/>
        </div>
        <xsl:apply-templates select="ep:content"/>
    </xsl:template>
    
	<xsl:template match="ep:gallery/ep:reference">
		<div class="womi-container">
			<xsl:call-template name="get_womi_image"></xsl:call-template>
		    <span onmousedown="openDialog(this, node, 'html-extra/womi-dialog.html','Atrybuty womi')" class="open-womi-dialog" title="Pokaż atrybuty womi"/>
		    <xsl:apply-templates select="ep:disabled-alternative-reference"/>
			<xsl:if test="not(ep:content)">
				<button onmousedown="addWomiContent(this, node)" class="add-womi-content" title="Dodaj tekst skojarzony"/> 
			</xsl:if>
			<xsl:if test="ep:content">
				<div class="contents-container">
					<div class="content">
						<div class="content-header">
							Tekst skojarzony klasyczny:<button onmousedown="toggleEditableContent(this)" class="toggle-editable-content" title="Pokaż tekst skojarzony"/>
							<xsl:if test="count(ep:content) &lt; 4">
								<button onmousedown="addWomiContent(this, node)" class="add-womi-content" title="Dodaj tekst skojarzony"/> 
							</xsl:if>
						</div>
						<div class="content-contents">
							<xsl:apply-templates select="ep:content[@ep:format='classic']">
								<xsl:with-param name="classic-content">true</xsl:with-param> 
							</xsl:apply-templates>
						</div>
					</div>
					<div class="editable-contents-container hidden">
						<xsl:apply-templates select="ep:content"/>
					</div>  
				</div>
			</xsl:if>
		</div>
	</xsl:template>
     
     <xsl:template match="ep:reference[parent::ep:biography|parent::ep:event]">
        <div class="womi-container">
            <xsl:call-template name="get_womi_image"></xsl:call-template>
            <span onmousedown="openDialog(this, node, 'html-extra/womi-dialog.html','Atrybuty womi')" class="open-womi-dialog" title="Pokaż atrybuty womi"/>
            <xsl:apply-templates select="ep:disabled-alternative-reference"/>
        </div>
    </xsl:template>
    
    <xsl:template match="ep:reference[parent::cnxml:exercise]">
        <div class="womi-container interactive">
            <img onerror="this.onerror=null;this.src='icons/brak-womi-ciemne.png';">
                <xsl:attribute name="src">
                    <xsl:value-of select="'icons/brak-womi-ciemne.png'"/>
                </xsl:attribute>
            </img>
            <span onmousedown="openDialog(this, node, 'html-extra/womi-dialog.html','Atrybuty womi')" class="open-womi-dialog" title="Pokaż atrybuty womi"/>
            <xsl:apply-templates select="ep:disabled-alternative-reference"/>
            <div class="exercise-womi-meta-container">
                <span class="womi-id-label">ID: </span><span class="womi-id"><xsl:value-of select="string(@ep:id)"/></span>
                <xsl:if test="epe:title">
                    <br></br>
                    <span class="womi-title-label">Tytuł: </span><span class="womi-title"><xsl:value-of select="string(./epe:title)"/></span>
                </xsl:if>
            </div>
            <xsl:apply-templates select="ep:content"/>
        </div>
    </xsl:template>
    
    <xsl:template name="get_womi_image">
        <img onerror="this.onerror=null;this.src='icons/brak-womi-ciemne.png';" onload="onImgLoad(this)" class="downloading-content">
            <xsl:attribute name="src">
                <xsl:choose>
                    <xsl:when test="*[local-name() = 'womiType'] = 'icon'">
                        <xsl:value-of select="concat($womi-image-url, number(@*[name()='ep:id']), '/icon/classic?res=480')"/>
                    </xsl:when>
                    <xsl:when test="*[local-name() = 'engine'] = 'womi_attachment'">
                        <xsl:value-of select="'icons/reader-nav-attachment.svg'"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="concat($womi-image-url, number(@*[name()='ep:id']), '/image/classic?res=480')"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
            <xsl:if test="node()[local-name() = 'width']">
                <xsl:attribute name="style">
                    <xsl:value-of select="concat('max-width: ', ep:width, '%;')"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="*[local-name() = 'engine'] = 'womi_attachment'">
                <xsl:text>Załącznik</xsl:text>
            </xsl:if>
        </img>

    </xsl:template>
     
    <xsl:template match="@ep:presentation-variant">
        <xsl:value-of select="concat(' ', .)"></xsl:value-of>
    </xsl:template>
     
     <xsl:template match="cn:exercise">
         <xsl:element name="div">
             <xsl:attribute name="class">
                 <xsl:value-of select="local-name()"/>
                 <xsl:if test="descendant::ep:config">
                     <xsl:text> dynamic</xsl:text>
                 </xsl:if>
                 <xsl:if test="@type">
                     <xsl:text> </xsl:text>
                     <xsl:value-of select="@type"></xsl:value-of>
                 </xsl:if>
                 <xsl:if test="@ep:on-paper = 'true'">
                     <xsl:text> on-paper</xsl:text>
                 </xsl:if>
                 <xsl:apply-templates select="@ep:presentation-variant"/>
             </xsl:attribute>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-header')"/>
                 </xsl:attribute>
                 <xsl:apply-templates select="." mode="label"></xsl:apply-templates>
                 <xsl:text> </xsl:text>
                 <xsl:apply-templates select="node()[local-name() = 'title']"/>
                 <xsl:if test="ep:effect-of-education">
                     <xsl:element name="span">
                         <xsl:attribute name="class">effect-of-education</xsl:attribute>
                         <xsl:element name="span">
                             <xsl:attribute name="class">effect-of-education-label</xsl:attribute>
                             <xsl:text> Poziom trudności: </xsl:text> 
                         </xsl:element>
                         <xsl:element name="span">
                             <xsl:attribute name="class">
                                 <xsl:text>effect-of-education</xsl:text>
                                 <xsl:text>-</xsl:text> 
                                 <xsl:value-of select="ep:effect-of-education"/>
                             </xsl:attribute>
                             <xsl:value-of select="ep:effect-of-education"/>
                         </xsl:element>
                     </xsl:element>
                 </xsl:if>
								 <xsl:if test="@ep:interactivity = 'random_quiz' ">
									 <span class="validation">
										 <button class="open-config-dialog" title="Konfiguracja zadania" onclick="exerciseConfigOpenDialog(this, node)"></button>
										 <button class="check" title="Sprawdź poprawność zadania" onclick="validateExercise(this,node)"></button>
										 <div class="status"></div>
									 </span>
								 </xsl:if>
             </xsl:element>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-contents')"/>
                 </xsl:attribute>
                 <xsl:if test="descendant::q:item and descendant::ep:config/ep:behaviour='randomize'">
					 <div class="validation-messages hidden">
						<ul></ul>
					 </div>
			     </xsl:if>
                 <xsl:apply-templates select="node()[local-name() != 'title' and local-name() != 'effect-of-education']"></xsl:apply-templates>
             </xsl:element>
         </xsl:element>
     </xsl:template>
     
	 <xsl:template match="ep:alternatives">
		<xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
                Format:
                <select onchange="onAlternativesChange(this)">
					<xsl:for-each select="ep:alternative/ep:formats">
						<option>
							 <xsl:attribute name="value">
								<xsl:for-each select="ep:format">
									<xsl:value-of select="concat(., ' ')"/>
								</xsl:for-each>
							</xsl:attribute>
							<xsl:if test="ep:format[. = 'classicmobile']">
								<xsl:attribute name="selected"/>
							</xsl:if>
							<xsl:for-each select="ep:format">
								<xsl:apply-templates select="." mode="translate_pl"/>
								<xsl:if test="position() != last()" >
									<xsl:value-of select="', '"/>
								</xsl:if>
							</xsl:for-each>
								
						</option>
					</xsl:for-each>
                </select>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates/>
            </xsl:element>
        </xsl:element>
     </xsl:template>
	 
     <xsl:template match="ep:alternatives[../@ep:interactivity='random_quiz']">
		<xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="*[ep:formats/ep:format = 'classicmobile']" />
            </xsl:element>
        </xsl:element>
     </xsl:template>
	 
     <xsl:template match="ep:alternative">
		<xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
                <xsl:if	test="not(ep:formats/ep:format[. = 'classicmobile'])">
					<xsl:value-of select="' hidden'"/>
                </xsl:if>
            </xsl:attribute>
            <xsl:attribute name="data-formats">
                <xsl:for-each select="ep:formats/ep:format">
					<xsl:value-of select="concat(., ' ')"/>			
				</xsl:for-each>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'formats']"/>
            </xsl:element>
        </xsl:element>
     </xsl:template>
     
    <xsl:template match="cnxml:commentary">
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
                <xsl:if test="@type">
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="@type"/>
                </xsl:if>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
                <xsl:choose>
                    <xsl:when test="@type">
                        <xsl:element name="span">
                            <xsl:attribute name="class">label</xsl:attribute>
                            <xsl:text>Przykład rozwiązania</xsl:text>
                        </xsl:element>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="." mode="label"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="q:response">
        <xsl:apply-templates></xsl:apply-templates>
		<xsl:choose>
            <xsl:when test="parent::*[@epe:correct = 'true']">
				<span class="correct-response-mark"></span>
			</xsl:when>
            <xsl:otherwise>
				<span class="incorrect-response-mark"></span>
			</xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	
	<xsl:template match="epe:set">
		<div class="validation-messages hidden">
			<ul></ul>
		</div>
		<div class="answer-set">
			<xsl:apply-templates/>
		</div>
	</xsl:template>
    
    <xsl:template match="q:answer">
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
				<xsl:text> </xsl:text>
				<xsl:value-of select="@epe:correct"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
                <xsl:number level="single" format="a"/>
                <xsl:text>)</xsl:text>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
            </xsl:element>
        </xsl:element>
    </xsl:template>    
    
    <xsl:template match="q:key">
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="ep:config|ep:behaviour|ep:presented-answers|ep:correct-in-set"></xsl:template>
    
    <xsl:template match="cnxml:label">
        <span class="label"><xsl:apply-templates select="node()"></xsl:apply-templates></span>
    </xsl:template>
    
    <xsl:template match="cnxml:emphasis[@effect='bold']">
        <b><xsl:apply-templates select="node()" /></b>
    </xsl:template>
    
    <xsl:template match="cnxml:emphasis[@effect='italics']">
        <i><xsl:apply-templates select="node()" /></i>
    </xsl:template>
    
    <xsl:template match="cnxml:emphasis[@effect='bolditalics']">
        <b><i><xsl:apply-templates select="node()" /></i></b>
    </xsl:template>
    
    <xsl:template match="ep:glossary-reference|ep:concept-reference|ep:tooltip-reference|ep:biography-reference|ep:event-reference">
        <span class="{local-name()}" onclick="openDialog(this, node, 'html-extra/glossary-reference-dialog.html', 'Edytuj odwołanie')"><xsl:apply-templates select="node()" /></span>
    </xsl:template>
    
    <xsl:template match="ep:bibliography-reference">
        <span class="{local-name()}" onclick="openDialog(this, node, 'html-extra/glossary-reference-dialog.html', 'Edytuj odwołanie')">
            <xsl:choose>
                <xsl:when test="parent::*[local-name() = 'source']">
                    <xsl:text>[Źródło]</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()" />
                </xsl:otherwise>
            </xsl:choose>
        </span>
    </xsl:template>
    
    <xsl:template match="cnxml:foreign">
        <span class="foreign"><xsl:apply-templates select="node()" /></span>
    </xsl:template>
    
    <xsl:template match="cnxml:newline">
				<xsl:if test="$whiteSpaceView='true'">
							<span class="new-line">&#9166;</span>
				</xsl:if>
        <br/>
    </xsl:template>

    <xsl:template match="cnxml:quote">
         <div class="quote">
             <div class="quote-header">
                 <xsl:apply-templates select="current()" mode="label"/>
                 <xsl:apply-templates select="ep:author" />
                 <xsl:apply-templates select="cn:label" />
             </div>
             <div class="quote-contents">
                 <xsl:apply-templates select="cn:para|text()" />
                 <xsl:apply-templates select="ep:comment" />
                 <xsl:apply-templates select="ep:source" />
             </div>
         </div>
     </xsl:template>
     
     <xsl:template match="cnxml:quote[@display='inline']">
         <span class="{local-name()}"><xsl:apply-templates/></span>
     </xsl:template>
     
     <xsl:template match="cn:quote/ep:author">
         <span class="author"><xsl:apply-templates></xsl:apply-templates></span>
     </xsl:template>
     
     <xsl:template match="ep:comment[parent::cn:quote]">
         <div class="comment-quote">
             <div class="comment-quote-contents">
                 <xsl:apply-templates/>
             </div>
         </div>
     </xsl:template>
     
     <xsl:template match="cn:quote[not(@display)]/text()">
         <div class="para"><xsl:value-of select="."/></div>
     </xsl:template>
      
    <xsl:template match="cn:problem">
        <xsl:variable name="name" select="local-name()"></xsl:variable>
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:element name="div">
             <xsl:attribute name="class">
                <xsl:value-of select="concat(local-name(), '-header')"/>
             </xsl:attribute>
            </xsl:element>
            <xsl:element name="div">
             <xsl:attribute name="class">
                <xsl:value-of select="concat(local-name(), '-contents')"/>
             </xsl:attribute>
             <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
            </xsl:element>
        </xsl:element>
    </xsl:template>
     
    <xsl:template match="ep:command">
        <xsl:variable name="name" select="local-name()"></xsl:variable>
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
                <xsl:apply-templates select="@ep:presentation-variant"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header')"/>
                </xsl:attribute>
                <xsl:apply-templates select="current()" mode="label"/>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
     <xsl:template match="ep:command/cn:problem">
         <xsl:variable name="name" select="local-name()"></xsl:variable>
         <xsl:element name="div">
             <xsl:attribute name="class">
                 <xsl:value-of select="local-name()"/>
             </xsl:attribute>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-header')"/>
                 </xsl:attribute>
                 <xsl:if test="count(following-sibling::cn:problem|preceding-sibling::cn:problem) > 0">
                     <xsl:element name="span">
                         <xsl:attribute name="class">numbering</xsl:attribute>
                         <xsl:number level="single"/>
                     </xsl:element>
                 </xsl:if>
             </xsl:element>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-contents')"/>
                 </xsl:attribute>
                 <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
             </xsl:element>
         </xsl:element>
     </xsl:template>
    
     <xsl:template match="ep:student-work">
         <xsl:variable name="name" select="local-name()"></xsl:variable>
         <xsl:element name="div">
             <xsl:attribute name="class">
                 <xsl:value-of select="local-name()"/>
                 <xsl:text> </xsl:text>
                 <xsl:value-of select="@ep:type"/>
                 <xsl:apply-templates select="@ep:presentation-variant"/>
             </xsl:attribute>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-header')"/>
                 </xsl:attribute>
                 <xsl:element name="span">
                     <xsl:attribute name="class">label</xsl:attribute>
                     <xsl:choose>
                         <xsl:when test="@ep:type='homework'">Praca domowa</xsl:when>
                         <xsl:when test="@ep:type='evaluation'">Test sprawdzający</xsl:when>
                         <xsl:when test="@ep:type='exercise-set'">Zestaw zadań</xsl:when>
                         <xsl:when test="@ep:type='project'">Projekt</xsl:when>
                         <xsl:otherwise>Do zrobienia</xsl:otherwise>
                     </xsl:choose>
                 </xsl:element>
             </xsl:element>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-contents')"/>
                 </xsl:attribute>
                 <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
             </xsl:element>
         </xsl:element>
     </xsl:template>
     
     <xsl:template match="ep:step">
         <xsl:element name="div">
             <xsl:attribute name="class">
                 <xsl:value-of select="local-name()"/>
             </xsl:attribute>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-header')"/>
                 </xsl:attribute>
                 <xsl:apply-templates select="." mode="label"></xsl:apply-templates>
                 <xsl:text> </xsl:text>
                 <xsl:value-of select="count(preceding-sibling::ep:step) + 1"/>
                 <xsl:text>.</xsl:text>
             </xsl:element>
             <xsl:element name="div">
                 <xsl:attribute name="class">
                     <xsl:value-of select="concat(local-name(), '-contents')"/>
                 </xsl:attribute>
                 <xsl:apply-templates select="node()[local-name() != 'title']"></xsl:apply-templates>
             </xsl:element>
         </xsl:element>
     </xsl:template>
	 
	 <xsl:template match="ep:bookmark">
		<span class="bookmark"></span>
	 </xsl:template>
     
	 
	 <xsl:template match="q:feedback[@correct]">
		<xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="concat(local-name(), '-', @correct, ' node-container')"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header header')"/>
                </xsl:attribute>
                <xsl:apply-templates select="current()" mode="label"/>
                
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents contents')"/>
                </xsl:attribute>
                <xsl:apply-templates select="node()"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="ep:fold-point">
        <div class="{local-name()}"></div>
    </xsl:template>
    
    <xsl:template match="ep:zebra-point">
        <div class="{local-name()}" title="Punkt zebry"></div>
    </xsl:template>

	<xsl:template match="ep:nbsp">
		<xsl:choose>
			<xsl:when test="$whiteSpaceView='true'">
				<span class="nbsp-end">&#176;</span>
			</xsl:when>
			<xsl:otherwise>
				<span class="nbsp">&#160;</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="ep:tab">
		<xsl:choose>
			<xsl:when test="$whiteSpaceView='true'">
				<span class="tab-end">&#8677;</span>
			</xsl:when>
			<xsl:otherwise>
				<span class="tab">&#160;&#160;&#160;&#160;</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
</xsl:stylesheet>
