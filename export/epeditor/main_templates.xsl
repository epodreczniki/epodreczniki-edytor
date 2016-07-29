<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
   <xsl:template match="*[@*[local-name()='type']='month_1' or local-name()='month_1']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'stycznia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_2' or local-name()='month_2']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'lutego'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_3' or local-name()='month_3']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'marca'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_4' or local-name()='month_4']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'kwietnia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_5' or local-name()='month_5']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'maja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_6' or local-name()='month_6']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'czerwca'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_7' or local-name()='month_7']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'lipca'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_8' or local-name()='month_8']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'sierpnia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_9' or local-name()='month_9']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'września'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_10' or local-name()='month_10']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'października'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_11' or local-name()='month_11']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'listopada'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='month_12' or local-name()='month_12']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'grudnia'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='label_description' or local-name()='label_description']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Opis: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_revision_date' or local-name()='label_revision_date']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data wydania: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_book_title' or local-name()='label_book_title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tytuł: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_book_subtitle' or local-name()='label_book_subtitle']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Podtytuł: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='license_list_title' or local-name()='license_list_title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Lista licencji'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='button_zoom_img' or local-name()='button_zoom_img']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Powiększ'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='button_zoom_in_out_img' or local-name()='button_zoom_in_out_img']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Powiększ / Pomniejsz'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='button_close' or local-name()='button_close']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zamknij'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='button_show_author_license' or local-name()='button_show_author_license']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pokaż autora i licencje'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='button_hide_author_license' or local-name()='button_hide_author_license']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ukryj autora i licencje'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi_cover_title' or local-name()='womi_cover_title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Okładka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi_title' or local-name()='womi_title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tytuł: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi_author' or local-name()='womi_author']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Autor: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi_license' or local-name()='womi_license']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Licencja: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi_information_undefined' or local-name()='womi_information_undefined']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Informacja niezdefiniowana'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_womi_answers_licenses' or local-name()='label_womi_answers_licenses']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Informacje o licencjach osadzonych obiektów w&#xA;        odpowiedziach (w kolejności występowania w treści e-podręcznika)'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='label_author_of_book_1' or local-name()='label_author_of_book_1']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Autor podręcznika: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_author_of_book_x' or local-name()='label_author_of_book_x']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Autorzy podręcznika: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_education_level_1' or local-name()='label_education_level_1']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Etap edukacyjny: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_education_level_x' or local-name()='label_education_level_x']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Etapy edukacyjne: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_school_type_1' or local-name()='label_school_type_1']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Typ szkoły: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_school_type_x' or local-name()='label_school_type_x']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Typy szkoły: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_module_title' or local-name()='label_module_title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Moduł: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_module_author_1' or local-name()='label_module_author_1']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Autor: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_module_author_x' or local-name()='label_module_author_x']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Autorzy: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_module_license' or local-name()='label_module_license']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Licencja: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_module_contact' or local-name()='label_module_contact']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Kontakt: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_module_www' or local-name()='label_module_www']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wersja WWW: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_module_core_curriculum' or local-name()='label_module_core_curriculum']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Hasła podstawy programowej: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='text_hpp_outside_ability' or local-name()='text_hpp_outside_ability']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Treść spoza podstawy programowej.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_about_author_generatedType' or local-name()='label_about_author_generatedType']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Moduł wygenerowany przez platformę'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='label_second_page_content_status_receipient' or local-name()='label_second_page_content_status_receipient']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Format treści: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_second_page_content_status_student' or local-name()='label_second_page_content_status_student']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'E-podręcznik dla ucznia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_second_page_content_status_teacher' or local-name()='label_second_page_content_status_teacher']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'E-podręcznik dla nauczyciela'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='school_type_primary' or local-name()='school_type_primary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'szkoła podstawowa'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='school_type_high' or local-name()='school_type_high']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'gimnazjum'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='school_type_secondary' or local-name()='school_type_secondary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'szkoła ponadgimnazjalna'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='subject_mathematics' or local-name()='subject_mathematics']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'matematyka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_polishLanguage' or local-name()='subject_polishLanguage']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'język polski'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_physics' or local-name()='subject_physics']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'fizyka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_chemistry' or local-name()='subject_chemistry']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'chemia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_biology' or local-name()='subject_biology']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'biologia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_geography' or local-name()='subject_geography']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'geografia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_natureScience' or local-name()='subject_natureScience']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'przyroda'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_earlySchoolEducation' or local-name()='subject_earlySchoolEducation']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'edukacja wczesnoszkolna'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_historyAndSociety' or local-name()='subject_historyAndSociety']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'historia i społeczeństwo'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_history' or local-name()='subject_history']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'historia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_computerScience' or local-name()='subject_computerScience']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'informatyka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_computerClasses' or local-name()='subject_computerClasses']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'zajęcia komputerowe'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_civicsEducation' or local-name()='subject_civicsEducation']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'wiedza o społeczeństwie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='subject_educationForSafety' or local-name()='subject_educationForSafety']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'edukacja dla bezpieczeństwa'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='label_mark_tasks' or local-name()='label_mark_tasks']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Oznaczenie zadań: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_table_desc' or local-name()='mark_taks_table_desc']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tabela zawierająca oznaczenia zadań.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_label_level_min' or local-name()='mark_taks_label_level_min']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'A'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_label_level_general' or local-name()='mark_taks_label_level_general']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'B'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_label_level_creative' or local-name()='mark_taks_label_level_creative']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'C'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_label_level_competence' or local-name()='mark_taks_label_level_competence']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'K'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_desc_level_min' or local-name()='mark_taks_desc_level_min']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'zadanie z minimalnego poziomu osiągnięcia efektu&#xA;        kształcenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_desc_level_general' or local-name()='mark_taks_desc_level_general']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'zadanie z ogólnego poziomu osiągnięcia efektu&#xA;        kształcenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_desc_level_creative' or local-name()='mark_taks_desc_level_creative']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'zadania z kreatywnego osiągnięcia efektu&#xA;        kształcenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='mark_taks_desc_level_competence' or local-name()='mark_taks_desc_level_competence']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'zadanie do osiągnięcia kompetencji'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='label_status_content' or local-name()='label_status_content']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Oznaczenia treści: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_status_content_table_desc' or local-name()='label_status_content_table_desc']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tabela zawierająca oznaczenia treści.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_content_status_teacher' or local-name()='label_content_status_teacher']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'oprawa metodyczna'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='label_content_status_expanding' or local-name()='label_content_status_expanding']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'treści rozszerzające'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='shortcut_content_status_teacher' or local-name()='shortcut_content_status_teacher']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'[N]'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='shortcut_content_status_expanding' or local-name()='shortcut_content_status_expanding']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'[R]'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='about_etextbook' or local-name()='about_etextbook']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'O e-podręczniku'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='about_description_table' or local-name()='about_description_table']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tabela z informacjami o epodręczniku'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='second_page' or local-name()='second_page']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Strona tytułowa'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='title_second_page' or local-name()='title_second_page']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tytuł strony drugiej'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='title_module_second_page' or local-name()='title_module_second_page']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Informacje szczegółowe'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='title_module_answers_licenses' or local-name()='title_module_answers_licenses']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Informacje o licencjach osadzonych obiektów (w&#xA;        kolejności występowania w treści modułu):'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='answers' or local-name()='answers']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Odpowiedzi'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='back_to_exercise' or local-name()='back_to_exercise']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'(Wróć do zadania)'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Footnotes' or local-name()='Footnotes']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Przypisy'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Glossary' or local-name()='Glossary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Glosariusz'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='TableofContents' or local-name()='TableofContents']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Spis treści'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='chapterPrev' or local-name()='chapterPrev']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Poprzedni rozdział'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='chapterNext' or local-name()='chapterNext']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Następny rozdział'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='fontBigger' or local-name()='fontBigger']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Większa czcionka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='fontSmaller' or local-name()='fontSmaller']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Mniejsza czcionka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Strength' or local-name()='Strength']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Siła'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Figure' or local-name()='Figure']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Figura'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Reference' or local-name()='Reference']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Referencja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Listing' or local-name()='Listing']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Listing'"/>
      </span>
   </xsl:template>
    
    
   <xsl:template match="*[@*[local-name()='type']='list' or local-name()='list']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='ShowNote' or local-name()='ShowNote']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pokaż sekcję do zapamiętania'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='HideNote' or local-name()='HideNote']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ukryj sekcję do zapamiętania'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Note' or local-name()='Note']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Notka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Remember' or local-name()='Remember']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zapamiętaj'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Example' or local-name()='Example']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Przykład'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='example' or local-name()='example']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Przykład'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='GlossSeeAlso' or local-name()='GlossSeeAlso']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zobacz również'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Citelink' or local-name()='Citelink']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Odsyłacz'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Rule' or local-name()='Rule']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Reguła'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='rule' or local-name()='rule']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Reguła'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Proof' or local-name()='Proof']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Dowód'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='proof' or local-name()='proof']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Dowód'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='statement' or local-name()='statement']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Twierdzenie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Step' or local-name()='Step']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Krok'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Diagnosis' or local-name()='Diagnosis']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Diagnoza'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Answer' or local-name()='Answer']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Odpowiedź'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='ShowSolution' or local-name()='ShowSolution']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pokaż odpowiedź'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='HideSolution' or local-name()='HideSolution']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ukryj odpowiedź'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='DifficultyLevel' or local-name()='DifficultyLevel']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Poziom trudności'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='ProblemSet' or local-name()='ProblemSet']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zbiór zadań'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='ShowAnswer' or local-name()='ShowAnswer']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pokaż odpowiedź'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='HideAnswer' or local-name()='HideAnswer']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ukryj odpowiedź'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='CheckAnswer' or local-name()='CheckAnswer']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Sprawdź'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Correct' or local-name()='Correct']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Prawidłowo'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Incorrect' or local-name()='Incorrect']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Nieprawidłowo'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Hint' or local-name()='Hint']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wskazówka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='NextHint' or local-name()='NextHint']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Następna wskazówka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Recreate' or local-name()='Recreate']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Nowy przykład'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Truth' or local-name()='Truth']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Prawda'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='False' or local-name()='False']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Fałsz'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='table_of_content' or local-name()='table_of_content']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Spis treści'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='table_of_content_back' or local-name()='table_of_content_back']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Powróć do spisu treści'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='chapter' or local-name()='chapter']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Rozdział'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='title_page' or local-name()='title_page']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Strona tytułowa'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='cover_title' or local-name()='cover_title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Okładka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Table' or local-name()='Table']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tabela'"/>
      </span>
   </xsl:template>
    
    
   <xsl:template match="*[@*[local-name()='type']='quote' or local-name()='quote']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Cytat'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='source' or local-name()='source']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='code' or local-name()='code']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Kod'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='note' or local-name()='note']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Notka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='problem' or local-name()='problem']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Problem'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='solution' or local-name()='solution']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Odpowiedź'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='commentary' or local-name()='commentary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Rozwiązanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='student-work' or local-name()='student-work']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Do zrobienia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='evaluation' or local-name()='evaluation']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Test sprawdzający'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='homework' or local-name()='homework']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Praca domowa'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='exercise-set' or local-name()='exercise-set']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zadanie'"/>
      </span>
   </xsl:template>

   <xsl:template match="*[@*[local-name()='type']='project' or local-name()='project']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Projekt'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='lead' or local-name()='lead']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='intro' or local-name()='intro']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Przedmiot lekcji'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='prerequisite' or local-name()='prerequisite']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Przygotuj przed lekcją:'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='command' or local-name()='command']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Polecenie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='experiment' or local-name()='experiment']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Doświadczenie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='observation' or local-name()='observation']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Obserwacja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='experiment-problem' or local-name()='experiment-problem']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Problem badawczy'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='hypothesis' or local-name()='hypothesis']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Hipoteza'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='instruments' or local-name()='instruments']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Co będzie potrzebne:'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='instructions' or local-name()='instructions']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Instrukcja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='conclusions' or local-name()='conclusions']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Podsumowanie'"/>
      </span>
   </xsl:template>
   <xsl:template match="*[@*[local-name()='type']='demonstration' or local-name()='demonstration']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Demonstracja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='objective' or local-name()='objective']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Cel'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='biography' or local-name()='biography']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Biogram'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='name' or local-name()='name']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='birth' or local-name()='birth']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date' or local-name()='date']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-birth' or local-name()='date-birth']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data urodzenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-death' or local-name()='date-death']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data śmierci'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-event-start' or local-name()='date-event-start']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data rozpoczęcia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-start' or local-name()='date-start']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data rozpoczęcia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-event-occur' or local-name()='date-event-occur']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-occur' or local-name()='date-occur']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-event-end' or local-name()='date-event-end']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data zakończenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='date-end' or local-name()='date-end']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data zakończenia'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='debate' or local-name()='debate']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Debata'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='zoomable' or local-name()='zoomable']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zoomable'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='aside' or local-name()='aside']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Obok'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='remember' or local-name()='remember']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zapamiętaj'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='theorem' or local-name()='theorem']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Twierdzenie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='lemma' or local-name()='lemma']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Lemat'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='corollary' or local-name()='corollary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wynik'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='law' or local-name()='law']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Prawo'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='proposition' or local-name()='proposition']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Propozycja'"/>
      </span>
   </xsl:template>



    
   <xsl:template match="*[@*[local-name()='type']='location' or local-name()='location']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-event' or local-name()='location-event']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-birth' or local-name()='location-birth']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce urodzenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-death' or local-name()='location-death']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce śmierci'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-event-start' or local-name()='location-event-start']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce rozpoczęcia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-event-occur' or local-name()='location-event-occur']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-event-end' or local-name()='location-event-end']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce zakończenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-start' or local-name()='location-start']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce rozpoczęcia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-occur' or local-name()='location-occur']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='location-end' or local-name()='location-end']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Miejsce zakończenia'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='death' or local-name()='death']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='gallery' or local-name()='gallery']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Galeria'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='gallery-legend-title' or local-name()='gallery-legend-title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Opisy ilustracji: '"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='glossary' or local-name()='glossary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Słowniczek'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='entry' or local-name()='entry']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wpis'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='content' or local-name()='content']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Treść'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='author' or local-name()='author']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Autor'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='event' or local-name()='event']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wydarzenie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='literary-work-summary' or local-name()='literary-work-summary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Streszczenie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='literary-work-description' or local-name()='literary-work-description']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'O dziele'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi-title-label' or local-name()='womi-title-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Obiekt multimedialny'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi-attachment-label' or local-name()='womi-attachment-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Załącznik'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='procedure-instructions' or local-name()='procedure-instructions']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Instrukcja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='tooltip' or local-name()='tooltip']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Dymek'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='step' or local-name()='step']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Krok'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='comment' or local-name()='comment']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='concept' or local-name()='concept']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pojęcie'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='bookmark' or local-name()='bookmark']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'[zakładka]'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='BC' or local-name()='BC']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'p.n.e.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='AD' or local-name()='AD']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'n.e.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='short-year' or local-name()='short-year']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'r.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='short-century' or local-name()='short-century']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'w.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='and' or local-name()='and']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'i'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='beginning-of-century' or local-name()='beginning-of-century']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'początek'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='middle-of-century' or local-name()='middle-of-century']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'połowa'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='turn-of-century' or local-name()='turn-of-century']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'przełom'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='around-year' or local-name()='around-year']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'ok.'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='interactive_exercise_link_label' or local-name()='interactive_exercise_link_label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zobacz aplikację interaktywną na portalu&#xA;        epodreczniki.pl'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='audio_womi_link_label' or local-name()='audio_womi_link_label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Nagranie audio dostępne na portalu epodreczniki.pl'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='movie_womi_link_label' or local-name()='movie_womi_link_label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Film dostępny na portalu epodreczniki.pl'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='attachment_womi_link_label' or local-name()='attachment_womi_link_label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Załącznik dostępny na portalu epodreczniki.pl'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='gallery_link_label' or local-name()='gallery_link_label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pełna galeria dostępna na portalu epodreczniki.pl'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi-gallery-element-label' or local-name()='womi-gallery-element-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Element'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi-image-label' or local-name()='womi-image-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ilustracja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi-interactive-label' or local-name()='womi-interactive-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Aplikacja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi-movie-label' or local-name()='womi-movie-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Nagranie wideo'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='womi-sound-label' or local-name()='womi-sound-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Nagranie audio'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='A' or local-name()='A']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'A'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='B' or local-name()='B']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'B'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='C' or local-name()='C']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'C'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='K' or local-name()='K']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'K'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_poziom1' or local-name()='JPOL3_poziom1']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_poziom2' or local-name()='JPOL3_poziom2']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_simple' or local-name()='JPOL3_simple']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zadanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_pairs' or local-name()='JPOL3_pairs']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Praca w parach'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_play' or local-name()='JPOL3_play']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zabawa / gra'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_sorceress' or local-name()='JPOL3_sorceress']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Czarownica'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_imp' or local-name()='JPOL3_imp']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Chochlik'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_reading' or local-name()='JPOL3_reading']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Czytanie ze zrozumieniem'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_challenge' or local-name()='JPOL3_challenge']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wyzwanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='JPOL3_interactive' or local-name()='JPOL3_interactive']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ćwiczenie interaktywne'"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='textarea_text_static_format' or local-name()='textarea_text_static_format']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Odpowiedź zapisz w zeszycie.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='no-correct-answer' or local-name()='no-correct-answer']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Żadna z odpowiedzi nie jest poprawna.'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Bibliography' or local-name()='Bibliography']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Bibliografia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='file' or local-name()='file']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Bibliografia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='no-alternative-reason' or local-name()='no-alternative-reason']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Element niedostępny: '"/>
      </span>
   </xsl:template>

    
   <xsl:template match="*[@*[local-name()='type']='section' or local-name()='section']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='para' or local-name()='para']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='exercise' or local-name()='exercise']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zadanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Exercise' or local-name()='Exercise']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zadanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='SubExercise' or local-name()='SubExercise']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Podzadanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='WOMI' or local-name()='WOMI']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zadanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='ShowCommentary' or local-name()='ShowCommentary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pokaż rozwiązanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='HideCommentary' or local-name()='HideCommentary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ukryj rozwiązanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='ShowCommentaryExample' or local-name()='ShowCommentaryExample']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pokaż przykład rozwiązania'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='HideCommentaryExample' or local-name()='HideCommentaryExample']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ukryj przykład rozwiązania'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='revisal' or local-name()='revisal']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Już wiesz:'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='effect' or local-name()='effect']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tego się nauczysz:'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='skill' or local-name()='skill']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Co potrafię?'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='knowledge' or local-name()='knowledge']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Co wiem?'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='understanding' or local-name()='understanding']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Co rozumiem?'"/>
      </span>
   </xsl:template>
   
    
   <xsl:template match="*[@*[local-name()='type']='to-be-read' or local-name()='to-be-read']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Do przeczytania'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='Definition' or local-name()='Definition']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Definicja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='definition' or local-name()='definition']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Definicja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='term' or local-name()='term']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='meaning' or local-name()='meaning']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='curiosity' or local-name()='curiosity']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ciekawostka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='tip' or local-name()='tip']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wskazówka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='warning' or local-name()='warning']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Uwaga'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='important' or local-name()='important']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Ważne'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='consider' or local-name()='consider']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zastanów się'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='see-also' or local-name()='see-also']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Zobacz także'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='good-to-know' or local-name()='good-to-know']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Warto wiedzieć'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='for-interested' or local-name()='for-interested']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Dla zainteresowanych'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='time-capsule' or local-name()='goodtime-capsule']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Kapsuła czasu'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='no-label' or local-name()='no-label']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='gen_bibliography' or local-name()='gen_bibliography']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Bibliografia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='gen_biography' or local-name()='gen_biography']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Biogramy'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='gen_event' or local-name()='gen_event']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wydarzenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='gen_glossary' or local-name()='gen_glossary']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Słowniczek'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='gen_concept' or local-name()='gen_concept']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pojęcia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='format' or local-name()='format']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Format'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='item' or local-name()='item']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='question' or local-name()='question']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='response' or local-name()='response']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='answer' or local-name()='answer']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Odpowiedź'"/>
      </span>
   </xsl:template>
	
   <xsl:template match="*[@*[local-name()='type']='config' or local-name()='config']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="''"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='key' or local-name()='key']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Id prawidłowej odpowiedzi'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='tip' or local-name()='tip']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wskazówka'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='content-id' or local-name()='content-id']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Identyfikator modułu'"/>
      </span>
   </xsl:template> 
    
   <xsl:template match="*[@*[local-name()='type']='repository' or local-name()='repository']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Repozytorium'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='version' or local-name()='version']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wersja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='version' or local-name()='version']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wersja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='created' or local-name()='created']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data utworzenia'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='revised' or local-name()='revised']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Data modyfikacji'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='title' or local-name()='title']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tytuł'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='presentationTitle' or local-name()='presentationTitle']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Tytuł do wyświetlenia'"/>
      </span>
   </xsl:template>
   
   <xsl:template match="*[@*[local-name()='type']='language' or local-name()='language']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Język'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='license' or local-name()='license']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Licencja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='actors' or local-name()='actors']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Autorzy'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='person' or local-name()='person']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Osoba'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='fullname' or local-name()='fullname']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Pełne imię i nazwisko'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='firstname' or local-name()='firstname']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Imię'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='surname' or local-name()='surname']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Nazwisko'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='email' or local-name()='email']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'E-mail'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='roles' or local-name()='roles']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Role'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='role' or local-name()='role']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Rola'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='keyword' or local-name()='keyword']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Słowo kluczowe'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='keywordlist' or local-name()='keywordlist']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Słowa kluczowe'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='abstract' or local-name()='abstract']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Abstrakt'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='e-textbook-module' or local-name()='e-textbook-module']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Moduł e-podręcznika'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='recipient' or local-name()='recipient']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Odbiorca'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='content-status' or local-name()='content-status']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Status treści'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='generated-type' or local-name()='generated-type']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Generowany typ'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='core-curriculum-entries' or local-name()='core-curriculum-entries']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Podstawy programowe'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='presentation' or local-name()='presentation']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Prezentacja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='numbering' or local-name()='numbering']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Numerowanie'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='type' or local-name()='type']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Typ'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='template' or local-name()='template']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Szablon'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='core-curriculum-entry' or local-name()='core-curriculum-entry']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Podstawa programowa'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='core-curriculum-stage' or local-name()='core-curriculum-stage']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Etap'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='core-curriculum-subject' or local-name()='core-curriculum-subject']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Przedmiot'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='core-curriculum-school' or local-name()='core-curriculum-school']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Szkoła'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='core-curriculum-version' or local-name()='core-curriculum-version']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Wersja'"/>
      </span>
   </xsl:template>
    
   <xsl:template match="*[@*[local-name()='type']='core-curriculum-ability' or local-name()='core-curriculum-ability']" mode="label">
      <span xmlns="http://www.w3.org/1999/xhtml" class="label">
         <xsl:value-of select="'Umiejętność'"/>
      </span>
   </xsl:template>
   
		<xsl:template match="*[@*[local-name()='type']='entry' or local-name()='entry']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Pozycja'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='article' or local-name()='article']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Artyku&#x142;'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='manual' or local-name()='manual']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Ustawa'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='misc' or local-name()='misc']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'&#x179;r&#xF3;d&#x142;a internetowe'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='incollection' or local-name()='incollection']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Ksi&#x105;&#x17C;ka'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='unpublished' or local-name()='unpublished']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Sprawozdanie'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='author' or local-name()='author']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Autorzy'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='title' or local-name()='title']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Tytu&#x142;'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='journal' or local-name()='journal']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Czasopismo'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='year' or local-name()='year']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Rok publikacji'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='number' or local-name()='number']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Numer wydania'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='booktitle' or local-name()='booktitle']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Tytu&#x142; ksi&#x105;&#x17C;ki'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='publisher' or local-name()='publisher']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Wydawca'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='address' or local-name()='address']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Miejsce publikacji'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='editor' or local-name()='editor']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'T&#x142;umacze'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='pages' or local-name()='pages']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Zakres stron'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='organization' or local-name()='organization']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Typ aktu prawnego'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='edition' or local-name()='edition']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Edycja'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='key' or local-name()='key']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Dane publikacji'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='howpublished' or local-name()='howpublished']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Adres strony'"/></span></xsl:template>
    <xsl:template match="*[@*[local-name()='type']='series' or local-name()='series']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Seria wydawnicza'"/></span></xsl:template>   
   <xsl:template match="*[@*[local-name()='type']='references' or local-name()='references']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Powi&#x105;zania modu&#x142;u z WOMI'"/></span></xsl:template>
   <xsl:template match="*[@*[local-name()='type']='module-header' or local-name()='module-header']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Nag&#x142;&#xF3;wek'"/></span></xsl:template>
   <xsl:template match="*[@*[local-name()='type']='play-and-learn' or local-name()='play-and-learn']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Baw si&#x119; i ucz'"/></span></xsl:template>
   <xsl:template match="*[@*[local-name()='type']='external' or local-name()='external']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'KZD'"/></span></xsl:template>
   <xsl:template match="*[@*[local-name()='type']='title-presentation' or local-name()='title-presentation']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Tytu&#x142; prezentacji'"/></span></xsl:template>
   <xsl:template match="*[@*[local-name()='type']='work-area' or local-name()='work-area']" mode="label"><span xmlns="http://www.w3.org/1999/xhtml" class="label"><xsl:value-of select="'Pytanie otwarte'"/></span></xsl:template>

</xsl:stylesheet>
