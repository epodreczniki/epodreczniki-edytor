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

	<xsl:param name="hideClosedReview" select="'false'"/>
	<xsl:template match="cn:content" mode="full-review">
		<xsl:choose>
			<xsl:when test="cn:section[ep:parameters/ep:start-new-page='true']">
				<xsl:apply-templates select="cn:section[ep:parameters/ep:start-new-page='true'][1]/preceding-sibling::cn:section//epe:review" mode="comm">
					<xsl:with-param name="showFullReview" select="true()"/>
				</xsl:apply-templates>
				<xsl:for-each select="cn:section[ep:parameters/ep:start-new-page='true']">
					<xsl:variable name="current_page_count" select="count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])"></xsl:variable>
					<xsl:variable name="content_between_new_pages" select="following-sibling::cn:section[(not(ep:parameters/ep:start-new-page) or ep:parameters/ep:start-new-page='false') and count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])=$current_page_count+1]//epe:review"/>
					<xsl:if test=".//epe:review or $content_between_new_pages">
						<div id="{@id}_page">
							<xsl:attribute name="class">page</xsl:attribute>
							<xsl:element name="div">
								<xsl:attribute name="class">page-header</xsl:attribute>
								<xsl:value-of select="concat('Pagina ', $current_page_count + 1, ':')"/>
							</xsl:element>
							<xsl:apply-templates select=".//epe:review|$content_between_new_pages" mode="comm">
								<xsl:with-param name="showFullReview" select="true()"/>
							</xsl:apply-templates>
						</div>
					</xsl:if>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="//epe:review" mode="comm">
					<xsl:with-param name="showFullReview" select="true()"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
  
	<xsl:template match="cn:content" mode="comm">
		<xsl:choose>
			<xsl:when test="cn:section[ep:parameters/ep:start-new-page='true']">
				<xsl:apply-templates select="cn:section[ep:parameters/ep:start-new-page='true'][1]/preceding-sibling::cn:section//epe:review" mode="comm"/>
				<xsl:if test="cn:section[ep:parameters/ep:start-new-page='true']">
					<xsl:for-each select="cn:section[ep:parameters/ep:start-new-page='true']">
						<xsl:variable name="current_page_count" select="count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])"></xsl:variable>
						<xsl:if test="concat(@id, '_page') = $showPage or $showPage = -1">
							<xsl:variable name="reviews_between_new_pages" select=".//epe:review | following-sibling::cn:section[(not(ep:parameters/ep:start-new-page) or ep:parameters/ep:start-new-page='false') and count(preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'])=$current_page_count+1]//epe:review"/>
							<xsl:apply-templates select="$reviews_between_new_pages" mode="comm"></xsl:apply-templates>	
						</xsl:if>
					</xsl:for-each>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="//epe:review" mode="comm"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="epe:review" mode="comm">
		<xsl:param name="showFullReview" select="false()"/>
		<div id="{@epe:id}" class="review" data-cmnr="#{generate-id(.)}">
			<xsl:choose>
				<xsl:when test="$showFullReview">
					<div class="review-header">
						<div class="review-counter">
							<xsl:value-of select="count(preceding::epe:review)+1"/>
						</div>
						<xsl:variable name="reviewState" select="epe:comment[last()]/@epe:comment-state"/>
						<div class="review-status current {$reviewState}">
							<xsl:attribute name="title">
								<xsl:choose>
									<xsl:when test="'opened'=$reviewState">Nowa</xsl:when>
									<xsl:when test="'closed'=$reviewState">Zamknięta</xsl:when>
									<xsl:when test="'resolved'=$reviewState">Do zatwierdzenia</xsl:when>
									<xsl:when test="'reopened'=$reviewState">Ponownie otwarta</xsl:when>
								</xsl:choose>
							</xsl:attribute>
						</div>
					</div>
					<div class="review-contents">
						<div class="reviewed-content">
							<xsl:apply-templates select="node()[not(self::epe:comment)]"/>
						</div>
						<xsl:apply-templates select="epe:comment" mode="comm">
							<xsl:with-param name="showFullReview" select="$showFullReview"/>
						</xsl:apply-templates>
					</div>
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="$hideClosedReview='false' or string(epe:comment[last()]/@epe:comment-state) != 'closed'">
						<div class="review-contents">
							<xsl:apply-templates select="epe:comment[1]" mode="comm"/>
						</div>
					</xsl:if>
				</xsl:otherwise>
			</xsl:choose>
		</div>
	</xsl:template>
	
	<xsl:template match="epe:review/epe:comment" mode="comm">
		<xsl:param name="showFullReview" select="false()"/>
		<xsl:variable name="dateTimeStr" select="string(@epe:comment-date)"/>
		<div>
			<xsl:attribute name="class">
				<xsl:choose>
					<xsl:when test="position() = 1">
						<xsl:text>comment first-comment</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>comment</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<div class="comment-header">
				<xsl:if test="position() = 1">
					<div class="review-counter">
						<xsl:value-of select="count(parent::epe:review/preceding::epe:review)+1"/>
					</div> 
				</xsl:if>
				<xsl:variable name="reviewState">
					<xsl:choose>
						<xsl:when test="not($showFullReview)">
							<xsl:value-of select="parent::epe:review/epe:comment[last()]/@epe:comment-state"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="@epe:comment-state"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<div class="review-status {$reviewState}">
					<xsl:attribute name="title">
						<xsl:choose>
							<xsl:when test="'opened'=$reviewState">Nowa</xsl:when>
							<xsl:when test="'closed'=$reviewState">Zamknięta</xsl:when>
							<xsl:when test="'resolved'=$reviewState">Do zatwierdzenia</xsl:when>
							<xsl:when test="'reopened'=$reviewState">Ponownie otwarta</xsl:when>
						</xsl:choose>
					</xsl:attribute>
				</div>
				<div class="review-author"><xsl:value-of select="string(@epe:comment-author)"/></div>
				<div class="review-date">
				<xsl:value-of select="substring($dateTimeStr, 1, 10)"/>
				<xsl:text> </xsl:text>
				<xsl:choose>
					<xsl:when test="substring($dateTimeStr, 20, 1)='-'"><xsl:value-of select="string(number(substring($dateTimeStr, 12, 2))+number(substring($dateTimeStr, 21, 2)))"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="string(number(substring($dateTimeStr, 12, 2))-number(substring($dateTimeStr, 21, 2)))"/></xsl:otherwise>
				</xsl:choose>
				<xsl:value-of select="substring($dateTimeStr, 14, 6)"/>
				</div>
			</div>
			<div class="comment-contents">
				<xsl:apply-templates />
			</div>
			<xsl:if test="not(preceding-sibling::epe:comment)">
				<div class="review-buttons">
					<xsl:choose>
						<xsl:when test="parent::*/epe:comment[last()]/@epe:comment-state = 'opened'">
							<button type="button" class="review-button-resolve">
								<xsl:attribute name="onmousedown">
									<xsl:text>reviewStateChange(node, "resolved");setCursorFocusOn(null);stopEvent(event);</xsl:text>
								</xsl:attribute>
								<xsl:text>Poprawione</xsl:text>
							</button>
							<button type="button" class="review-button-close">
								<xsl:attribute name="onmousedown">
									<xsl:text>reviewStateChange(node, "closed");setCursorFocusOn(null);stopEvent(event);</xsl:text>
								</xsl:attribute>
								<xsl:text>Zamknij</xsl:text>
							</button>
						</xsl:when>
						<xsl:when test="parent::*/epe:comment[last()]/@epe:comment-state = 'reopened'">
							<button type="button" class="review-button-resolve">
								<xsl:attribute name="onmousedown">
									<xsl:text>reviewStateChange(node, "resolved");setCursorFocusOn(null);stopEvent(event);</xsl:text>
								</xsl:attribute>
								<xsl:text>Poprawione</xsl:text>
							</button>
						</xsl:when>
						<xsl:when test="following-sibling::epe:comment[last()]/@epe:comment-state = 'resolved'">
							<button type="button" class="review-button-reopen">
								<xsl:attribute name="onmousedown">
									<xsl:text>reviewStateChange(node, "reopened");setCursorFocusOn(null);stopEvent(event);</xsl:text>
								</xsl:attribute>
								<xsl:text>Do poprawy</xsl:text>
							</button>
							<button type="button" class="review-button-close">
								<xsl:attribute name="onmousedown">
									<xsl:text>reviewStateChange(node, "closed");setCursorFocusOn(null);stopEvent(event);</xsl:text>
								</xsl:attribute>
								<xsl:text>Zamknij</xsl:text>
							</button>
						</xsl:when>
					</xsl:choose>
					<button type="button" class="review-add-comment-button" title="Dodaj komentarz">
						<xsl:attribute name="onmousedown">
							<xsl:text>showReviewReport();</xsl:text>
							<xsl:text>Editor.getActiveCanvas().setViewParam('fullReviewMode', '</xsl:text>
										<xsl:value-of select="parent::epe:review/@epe:id"/>
										<xsl:text>');</xsl:text>
							<xsl:text>reviewAddComment(node);</xsl:text>
						</xsl:attribute>
					</button>
					<xsl:choose>
						<xsl:when test="$showFullReview">
							<button type="button" class="back-to-review-panel-button" title="Widok z panelem bocznym">
								<xsl:attribute name="onmousedown">
									<xsl:text>Editor.getActiveCanvas().setViewParam('showPage', '</xsl:text>
									<xsl:value-of select="(ancestor::cn:section[parent::cn:content and ep:parameters/ep:start-new-page='true'] | ancestor::cn:section[parent::cn:content]/preceding-sibling::cn:section[ep:parameters/ep:start-new-page='true'][1])[last()]/@id"/>
									<xsl:text>_page');</xsl:text>
									<xsl:text>showNoReviews();showReviewPanel();</xsl:text>
									<xsl:text>focusOnReview('</xsl:text>
									<xsl:value-of select="count(parent::epe:review/preceding::epe:review)+1"/>
									<xsl:text>');</xsl:text>
									<xsl:text>return false;</xsl:text>
								</xsl:attribute>
							</button>
						</xsl:when>
						<xsl:otherwise>
							<button type="button" class="review-panel-button">
									<xsl:attribute name="onmousedown">
											<xsl:text>showReviewReport();</xsl:text>
											<xsl:text>Editor.getActiveCanvas().setViewParam('fullReviewMode', '</xsl:text>
											<xsl:value-of select="parent::epe:review/@epe:id"/>
											<xsl:text>');</xsl:text>
											<xsl:text>focusOnReview('</xsl:text>
											<xsl:value-of select="count(parent::epe:review/preceding::epe:review)+1"/>
											<xsl:text>');</xsl:text>
											<xsl:text>return false;</xsl:text>
									</xsl:attribute>
							</button>
						</xsl:otherwise>
					</xsl:choose>
				</div>
			</xsl:if>
		</div>
	</xsl:template>

	<xsl:template match="epe:review[$hideClosedReview='false' or epe:comment[last()]/@epe:comment-state != 'closed']">
		<span class="cmref" data-cmnr="#{generate-id(.)}">
			<xsl:apply-templates select='./node()[not(self::epe:comment)]' />
			<xsl:apply-templates select='epe:comment[1]' />
		</span>
	</xsl:template>

	<xsl:template match="epe:review[$hideClosedReview='true' and epe:comment[last()]/@epe:comment-state = 'closed']">
		<xsl:apply-templates select='./node()[not(self::epe:comment)]' />
	</xsl:template>

	 <xsl:template match="epe:comment[$hideClosedReview='false' or parent::epe:review/epe:comment[last()]/@epe:comment-state != 'closed']">
		<sup>
			<xsl:attribute name="ondblclick">
				<xsl:text>showReviewPanel();</xsl:text>
			</xsl:attribute>
			<xsl:text>[</xsl:text>
				<xsl:value-of select="count(preceding::epe:review)+1"/>
			<xsl:text>]</xsl:text>
		</sup>
	</xsl:template>

	<xsl:template match="epe:comment[$hideClosedReview='true' and parent::epe:review/epe:comment[last()]/@epe:comment-state = 'closed']">
	</xsl:template>

</xsl:stylesheet>
